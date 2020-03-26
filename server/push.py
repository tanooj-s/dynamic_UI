from neo4j import GraphDatabase
import networkx as nx
import numpy as np
import pandas as pd

df = pd.read_excel(io='client_data.xlsx',sheet_name='Securities')
shares_df = pd.read_excel(io='client_data.xlsx',sheet_name='Trades')

unique_companies = list(set(df.WorksFor.values))
unique_brokerages = list(set(df.TradeMemberName.values))

def create_company(tx,company):
	tx.run('CREATE (c:Company{name:$company_name})',company_name=company)

def create_brokerage(tx,brokerage):
	tx.run('CREATE (n:Brokerage{name:$brokerage_name})',brokerage_name=brokerage)


def match_clients(tx,row):
	tx.run('CREATE (n:Client{name:$name, pan:$pan, address:$address, phone:$phone, email:$email, bank:$bank})',
					name=row['ClientName'],pan=row['PAN'],
					email=row['Email'],phone=row['Phone'],address=row['Address'],
					bank=row['BankName'])
	tx.run('MATCH (client:Client{name:$client_name}) WITH client OPTIONAL MATCH (company:Company{name:$company_name}) WITH client, company MERGE (client)-[r:WORKS_FOR]->(company)',client_name=row['ClientName'],company_name=row['WorksFor'])
	tx.run('MATCH (client:Client{name:$client_name}) WITH client OPTIONAL MATCH (broker:Brokerage{name:$broker_name}) WITH client, broker MERGE (client)<-[s:BROKERS_FOR]-(broker)',client_name=row['ClientName'],broker_name=row['TradeMemberName'])


def process_shares(tx,row):
	tx.run('MATCH (client:Client{name:$client_name}) WITH client OPTIONAL MATCH (company:Company{name:$company_name}) WITH client, company MERGE (client)-[o:OWNS_SHARES{volume:$trade_volume}]->(company)', client_name=row['TradingMember'], company_name=row['OwnsSymbol'], trade_volume=row['Volume'])

driver = GraphDatabase.driver(uri="bolt://localhost:7687", auth=("neo4j","12345"))
with driver.session() as session:
	# flush db
	session.run('MATCH (n) detach delete n') # don't need this line later on	
	for company in unique_companies:
		session.write_transaction(create_company,company)
	for brokerage in unique_brokerages:
		session.write_transaction(create_brokerage,brokerage)
	for i, row in df.iterrows():
		session.write_transaction(match_clients, row)
	for i, row in shares_df.iterrows():
		session.write_transaction(process_shares, row)




