import numpy as np
import pandas as pd
import datetime
import string
import random
import names
from strgen import StringGenerator
from faker import Faker

from neo4j import GraphDatabase

# 2-tuples of form (name, category)
company_tuples = [
('TATA Motors','Automotive'),
('GAIL', 'Oil & Gas'),
('ITC Limited','Consumer Goods'),
('Cadila','Pharmaceuticals'),
('Mahindra & Mahindra', 'Automative'),
('Hero MotoCorp','Automotive'),
('ICICI Bank','Banking'),
('Axis Bank','Banking'),
('UltraTech Cement','Cement'),
('Hindustan Unilever','Consumer Goods'),
('TCS','Infotech'),
('Infosys','Infotech'),
('Wipro','Infotech'),
('HDFC','Financials'),
('Tata Steel', 'Iron and Steel'),
('Steel Authority of India','Iron and Steel'),
('JSW Steel Ltd','Iron and Steel'),
('Coal India', 'Mining'),
('Bharti Airtel','Telecom'),
('Vodafone India', 'Telecom'),
('Tata Power', 'Utilities'),
('State Bank of India','Banking'),
('Suzlon','Alternative Energy'),
('ONGC','Oil & Gas'),
('Indian Oil','Oil & Gas'),
('Reliance','Conglomerate'),
('Bharat Petroleum','Oil & Gas'),
('Rajesh Exports','Gems'),
('Bombay Dyeing','Textiles'),
('Britannia','Food Products'),
('DLF','Real Estate'),
('Eureka Forbes','Consumer Goods'),
('Flipkart','Ecommerce'),
('Haldirams','Food Products'),
('Sun Pharmaceuticals','Pharmaceuticals'),
('Karnataka Bank','Banking'),
('Larsen & Toubro','Engineering'),
('MRF','Rubber Products'),
('Maruti Suzuki','Automotive'),
('Parle','Food Products'),
('Royal Enfield','Automotive'),
('SpiceJet','Aviation'),
('Central Bank of India', 'Banking'),
('Allahabad Bank', 'Banking'),
('Andhra Bank', 'Banking'),
('NTPC Limited','Utilities'),
('Oriental Bank of Commerce', 'Banking'),
('Indiabulls','Financial Services'),
('Adani Ports & SEZ Limited','Shipping'),
('Asian Paints','Chemicals'),
('Zomato','Food Delivery'),
('Dabur','FMCG')]

# 3-tuples of form (name, segments, sebi_no)
brokerage_tuples = [
('Airan Finstocks Private Limited','Capital Market, Currency Futures, Futures & Options, IPO','INZ000214031'),
('Alacrity Securities Ltd','Capital Market, Futures & Options','INZ000215936'),
('Beeline Broking Ltd','Capital Market, Currency Futures, Futures & Options','INZ000000638'),
('CIL Securities Ltd','Capital Market, Currency Futures, Futures & Options, Mutual Funds, IPO','INZ000169535'),
('Intellect Stock Broking Ltd','Capital Market, Commodity, Currency Futures, Debt Market, Futures & Options','INZ000191632'),
('Karvy Stock Broking Ltd','Capital Market, Commodity, Currency Futures, Debt Market, Futures & Options, Mutual Funds, WDM, IPO','INZ000172733'),
('Market Creators Ltd','Capital Market, Commodity, Currency Futures, Futures & Options, Mutual Funds, IPO','INZ000206338'),
('Nariman Finvest Private Ltd','Capital Market, Currency Futures, Debt Market, Futures & Options, IPO','INZ000229936'),
('Quantum Global Solutions Ltd','Capital Market, Currency Futures, Futures & Options, IPO','INB230825632'),
('Saffron Equity Advisors Pvt Ltd','Capital Market','INZ000174937')]


designations = ['CEO', 'CFO', 'Managing Director', 'President', 'Independent Director', 'Regular Employee']

banks = ['State Bank of India', 'Karnataka Bank', 'Oriental Bank of Commerce', 'Allahabad Bank', 'ICICI Bank', 'Yes Bank',
        'Axis Bank', 'Bank of Baroda', 'Punjab National Bank', 'HDFC', 'IDBI', 'IndusInd Bank', 'Kotak Mahindra Bank',
        'HSBC', 'Bank of America', 'BNP Paribas', 'Citibank', 'Standard Chartered Bank']

cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Ahmedabad','Chennai','Kolkata','Surat','Pune','Jaipur','Visakhapatnam','Kanpur','Nagpur','Lucknow','Thane','Bhopal','Indore','Patna','Vadodara']

city_probabilities = [0.1495,0.1323,0.1014,0.0818,0.0669,0.0562,0.0539,0.0537,0.0375,0.0366,0.0361,0.0332,0.0289,0.0278,0.0221,0.0216,0.0200,0.0202,0.0201]

email_domains = ['@gmail.com','@yahoo.com','@protonmail.com','@hotmail.com']

event_types = ['Board Meeting', 'Financial Report', 'Dividend', 'Bonus', 'Buyback', 'Consolidation',
              'Reduction in Capital', 'Investor Call', 'Credit Rating Change', 'Change in Directors',
              'Capital Restructuring', 'Raising of Funds'] # see whatever else there is, assign probabilities based on real events reported to NSE

print("Generating timestamps at seconds resolution for two month interval....")
start_timestamp = datetime.datetime.strptime("01-02-2020 00:00:00", "%d-%m-%Y %H:%M:%S")
end_timestamp = datetime.datetime.strptime("31-03-2020 00:00:00", "%d-%m-%Y %H:%M:%S")
generated_timestamps = [(start_timestamp + datetime.timedelta(seconds=x)).strftime("%d/%m/%Y %H:%M:%S") for x in range(0, int((end_timestamp-start_timestamp).total_seconds()))]
print("Timestamps generated!")


# look at Ruby's fraud use cases
# each fraud case type should be a cypher query


# try to use faker instead for generating data (see if it can do indian names and indian addresses)
class Client:
  def __init__(self):
    self.id = StringGenerator('[\d]{6}').render() # 6 digit unique client code
    self.name = names.get_full_name()
    first_name = self.name.split(' ')[0]
    last_name = self.name.split(' ')[1]
    self.address = np.random.choice(a = cities, p = city_probabilities) # only put cities for now, generating realistic addresses will be hard
    self.phone = StringGenerator('[7-9]{3}[\d]{7}').render()
    self.email = first_name.lower() + last_name.lower() + np.random.choice(a = email_domains)
    self.pan = StringGenerator('[A-Z]{5}[\d]{4}[A-Z]').render()
    self.designation = np.random.choice(a = designations, p = [0.02, 0.02, 0.02, 0.02, 0.02, 0.9]) # change p per number of designations
    self.bank = np.random.choice(a = banks) # - technically these banks are also companies but can worry about that later
    #self.appointment_date = add this later, only applicable for KMP (which is iff designation =/= regular employee)

class Company:
  def __init__(self,index):
    this_tuple = company_tuples[index]
    self.id = StringGenerator('[\d]{5}').render() # 5 digit company code
    self.name = this_tuple[0]
    self.type = this_tuple[1]
    self.address = np.random.choice(a = cities)
    self.phone = StringGenerator('[7-9]{3}[\d]{7}').render()

class Brokerage:
  def __init__(self,index):
    this_tuple = brokerage_tuples[index]
    self.name = this_tuple[0]
    self.segments = this_tuple[1]
    self.sebi_no = this_tuple[2]
    self.address = np.random.choice(a = cities)
    self.phone = StringGenerator('[7-9]{3}[\d]{7}').render()

# look at NSE website for event types and whether all have broadcast dates
class Event:
  def __init__(self):
    self.type = np.random.choice(a = event_types)
    self.broadcast_date = np.random.choice(a = generated_timestamps)
    self.pdf_link = 'www.nseindia.com/corporates/' + StringGenerator('[\w]{15}').render() + '.pdf' # not real links but will look pretty real

class Trade:
  def __init__(self):
    self.type = np.random.choice(a = ['buy', 'sell'])
    self.exchange = np.random.choice(a = ['NSE', 'BSE'])
    self.ISIN = StringGenerator('[\d]{12}').render() # 12 digit ISIN code
    self.volume = str(100*np.random.random_integers(100)) # random share volumes up to 10000 in intervals of 100
    self.timestamp = np.random.choice(generated_timestamps)
    self.share_price = "{0:.2f}".format(100*np.random.random_sample()) # random value upto 100, only two decimal points


#------------ create Company, Brokerage and Client objects to iterate through -----

print("Generating company objects...")
company_objects = [Company(i) for i in range(len(company_tuples))]
print("Generating brokerage objects...")
brokerage_objects = [Brokerage(i) for i in range(len(brokerage_tuples))]
print("Generating client objects...")
client_objects = [Client() for _ in range(100)] # create 100 random clients


#------------ Neo4j transaction functions to create nodes/relationships ---------

def create_company_node(tx, company):
  tx.run('CREATE (c:Company{name:$name, id:$id, type:$type, address:$address, phone:$phone})',
          name=company.name, id=company.id, type=company.type, address=company.address, phone=company.phone)

def create_brokerage_node(tx, brokerage):
  tx.run('CREATE (b:Brokerage{name:$name, sebi_no:$sebi_no, segments:$segments, address:$address, phone:$phone})',
          name=brokerage.name, sebi_no=brokerage.sebi_no, segments=brokerage.segments, address=brokerage.address, phone=brokerage.phone)

def create_and_match_event(tx, event, company):
  tx.run('MATCH (company:Company{name:$company_name}) WITH company MERGE (company)-[:had_event]->(e:Event{type:$type, broadcast_date:$broadcast_date, pdf_link:$pdf_link})',
          company_name=company.name, type=event.type, broadcast_date=event.broadcast_date, pdf_link=event.pdf_link)


def create_client_match_to_company_and_brokerage(tx,client,company,brokerage):
  tx.run('CREATE (client:Client{name:$name, id:$id, address:$address, email:$email, designation:$designation, phone:$phone, bank:$bank, pan:$pan})',
          name=client.name, id=client.id, address=client.address, email=client.email, designation=client.designation, phone=client.phone, bank=client.bank, pan=client.pan)
  if client.designation == 'Regular Employee':
    tx.run('MATCH (client:Client{id:$client_id}) WITH client OPTIONAL MATCH (company:Company{id:$company_id}) WITH client, company MERGE (client)-[:works_for]->(company)',
          client_id=client.id, company_id=company.id)
  elif client.designation == 'Independent Director':
    tx.run('MATCH (client:Client{id:$client_id}) WITH client OPTIONAL MATCH (company:Company{id:$company_id}) WITH client, company MERGE (client)-[:independent_director_for]->(company)',
          client_id=client.id, company_id=company.id)
  else:
    tx.run('MATCH (client:Client{id:$client_id}) WITH client OPTIONAL MATCH (company:Company{id:$company_id}) WITH client, company MERGE (client)-[:is_kmp_for]->(company)',
          client_id=client.id, company_id=company.id)
  tx.run('MATCH (client:Client{id:$client_id}) WITH client OPTIONAL MATCH (brokerage:Brokerage{sebi_no:$sebi_no}) WITH client, brokerage MERGE (client)-[:trades_through]->(brokerage)',
          client_id=client.id, sebi_no=brokerage.sebi_no)

# still need to add kmp for brokerages

def create_and_match_trade(tx, trade, client, company):
  tx.run('CREATE (t:Trade{type:$type, exchange:$exchange, ISIN:$ISIN, volume:$volume, timestamp:$timestamp, share_price:$share_price})',
          type=trade.type, exchange=trade.exchange, ISIN=trade.ISIN, volume=trade.volume, timestamp=trade.timestamp, share_price=trade.share_price)
  tx.run('''MATCH (trade:Trade{ISIN:$ISIN}) WITH trade
          OPTIONAL MATCH (client:Client{id:$client_id})-[:trades_through]->(brokerage) WITH trade, client, brokerage
          OPTIONAL MATCH (company:Company{id:$company_id}) WITH trade, client, brokerage, company
          MERGE (client)-[:trades_through]->(brokerage)-[:executed]->(trade)-[:part_of]->(company)''', # needs to be surjective
          ISIN=trade.ISIN, client_id=client.id, company_id=company.id)



driver = GraphDatabase.driver(uri="bolt://localhost:7687", auth=("neo4j","12345"))
with driver.session() as session:
  session.run('MATCH (n) detach delete n') # flush db first
  #first create all company nodes, then attach event nodes to each
  for company in company_objects:
    session.write_transaction(create_company_node, company)
    print("Created node for " + company.name)
    for _ in range(np.random.randint(1,11)): # random number of events up to 10 per company
      this_event = Event()
      session.write_transaction(create_and_match_event, this_event, company)
      print(company.name + " <------ " + this_event.type)
    print("------------------------")
    print("\n")

  #then create all brokerage nodes
  for brokerage in brokerage_objects:
    session.write_transaction(create_brokerage_node, brokerage)
    print("Created brokerage node for " + brokerage.name)
  print("------------------------")
  print("\n")

  # create unique works_for/is_kmp for all generated client nodes and unique brokerages they trade through
  for client in client_objects:
    works_for_company = np.random.choice(company_objects)
    trading_brokerage = np.random.choice(brokerage_objects)
    session.write_transaction(create_client_match_to_company_and_brokerage, client, works_for_company, trading_brokerage)
    print("Created client node: " + client.name + " works for " + works_for_company.name + ", trades through "  + trading_brokerage.name)
  print("------------------------")
  print("\n")

  # generate trades, match to existing client, company, brokerage objects
  for i in range(500):
    this_trade = Trade()
    this_client = np.random.choice(client_objects)
    trade_company = np.random.choice(company_objects)
    session.write_transaction(create_and_match_trade, this_trade, this_client, trade_company)
    print ("Executed trade " + str(i+1) + " at " + this_trade.timestamp + ": " + this_client.name + " --> " + trade_company.name)
    print (this_trade.type + " " + this_trade.volume + " shares at " + this_trade.share_price)
    print("-------------")





  '''
RELATIONSHIPS FOR EACH NODE TYPE
(COMPANY)-[:had_event]->(EVENT)

(CLIENT)-[:works_for]->(COMPANY)
(CLIENT)-[:is_kmp]->(COMPANY)
(CLIENT)-[:independent_director]->(COMPANY)

(CLIENT)-[:is_kmp]->(BROKERAGE)
(CLIENT)-[:authorized_person]->(BROKERAGE)

(CLIENT)-[:through]->(BROKERAGE)-[:executes]->(TRADE)-[:part_of]->(COMPANY)
'''
# first generate companies and brokerages
# then generate events, link to companies
# then generate clients, match to companies and brokerages, but only works_for/is_kmp/is_independent_director etc
# then generate trades and link back to companies, although this will take a bit of thought

# I guess just generate law abiders first then try and hard code fraud cases later
# and then later on add some kind of history for share prices for each company - will need to associate share price at a timestamp and match to trade timestamps

