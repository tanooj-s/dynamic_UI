from neo4j import GraphDatabase
import networkx as nx
import numpy as np
import pandas as pd

# ----------CREATING GRAPH AND PUSHING TO NEO4J FOR POPOTO VISUALIZATION -----------------

# create networkx graph that will return a graph that we can push to neo4j

graph = nx.MultiDiGraph()
df = pd.read_excel(io='client_data.xlsx',sheet_name='Trades')

client_node_list = list(set(df.TradingMember.values))
company_node_list = list(set(df.WorksFor.values))

for c in client_node_list: # add client nodes
	graph.add_node(c, name=c, type='client')
for c in company_node_list: # add company nodes
	graph.add_node(c, name=c, type='company')

works_for_df = df[['TradingMember','WorksFor']] # add one to one works for edges to graph
works_for_df.drop_duplicates(inplace=True) 
graph.add_edges_from(works_for_df.values, rel_type='works_for')

owns_shares_df = df[['TradingMember','OwnsSymbol','Volume']] # add weighted owns shares edges to graph
for index, row in owns_shares_df.iterrows():
	graph.add_edge(u_for_edge=row['TradingMember'],v_for_edge=row['OwnsSymbol'], rel_type='owns_shares',volume=row['Volume'])

# get nodes and edges as lists
edges = list(nx.to_edgelist(graph))
nodes = list(nx.get_node_attributes(graph,'type').items())

client_nodes = [n for n in nodes if n[1] == 'client']
company_nodes = [n for n in nodes if n[1] == 'company']

works_for_edges = [e for e in edges if e[2]['rel_type'] == 'works_for']
owns_shares_edges = [e for e in edges if e[2]['rel_type'] == 'owns_shares']

def push_client_to_db(tx,node):
	tx.run('CREATE (c:Client{name:$name})', name = node[0])
	print("Pushed " + node[0] + " to Neo4j")

def push_company_to_db(tx,node):
	tx.run('CREATE (c:Company{name:$name})', name = node[0])
	print("Pushed " + node[0] + " to Neo4j")

def push_works_for_to_db(tx,edge):
	tx.run('MATCH (c1:Client{name: $client_name}) WITH c1 MATCH (c2:Company{name:$company_name}) MERGE (c1)-[w:WORKS_FOR]->(c2)', client_name=edge[0], company_name=edge[1])
	print("Pushed " + edge[0] + " working for " + edge[1] + " to db")

def push_owns_shares_to_db(tx,edge):
	tx.run('MATCH (c1:Client{name: $client_name}) WITH c1 MATCH (c2:Company{name:$company_name}) MERGE (c1)-[o:OWNS_SHARES{volume:$volume}]->(c2)', client_name=edge[0], company_name=edge[1], volume=edge[2]['volume'])
	print("Pushed " + edge[0] + " shares in " + edge[1] + " with a volume of " + str(edge[2]['volume']))


print("Connecting to Neo4j database....")
driver = GraphDatabase.driver(uri="bolt://localhost:7687", auth=("neo4j","12345"))
print("Starting to push data to Neo4j......")

with driver.session() as session:	
	for node in client_nodes:
		session.write_transaction(push_client_to_db, node)
	for node in company_nodes:
		session.write_transaction(push_company_to_db, node)
	for edge in works_for_edges:
		session.write_transaction(push_works_for_to_db, edge)
	for edge in owns_shares_edges:
		session.write_transaction(push_owns_shares_to_db, edge)
	