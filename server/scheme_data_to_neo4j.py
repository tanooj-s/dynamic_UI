import numpy as np
import pandas as pd
import datetime
import string
import random
import names
from strgen import StringGenerator
from faker import Faker

from neo4j import GraphDatabase

# 3-tuples of form (name, category, corporate address)
company_tuples = [
('TATA Motors','Automotive','Bombay House, 24, Homi Modi Street, Fort, Mumbai - 400001'),
('GAIL', 'Oil & Gas','GAIL Bhawan, 16 Bhikaji Cama Place, R K Puram, New Delhi - 110066'),
('ITC Limited','Consumer Goods', '37, J.L. Nehru Road, Kolkata - 700071'),
('Cadila','Pharmaceuticals','Sarkhej-Dholka Road, Bhat, Ahmedabad, India - 382210'),
('Mahindra & Mahindra', 'Automotive','4th Floor, Mahindra Towers, Dr. G.M. Bhosale Marg, P.K. Kurne Chowk, Worli, Mumbai - 400018'),
('Hero MotoCorp','Automotive', 'The Grand Plaza, Plot No. 2, Nelson Mandela Road, Vasant Kunj Phase II, New Delhi - 110070'),
('ICICI Bank','Banking','ICICI Bank Tower, Near Chakli Circle, Old Padra Road, Vadodara - 390007'),
('Axis Bank','Banking','Axis Bank Limited, ‘Axis House’, C2 Wadia International Centre, Pandurang Budhkar Marg, Worli, Mumbai - 400025'),
('UltraTech Cement','Cement', 'Ahura Centre, Mahakali Caves Road, Near MIDC Office, Andheri (E), Mumbai - 400093'),
('Hindustan Unilever','Consumer Goods', 'Unilever House, B. D. Sawant Marg, Chakala, Andheri East, Mumbai - 400099'),
('TCS','Infotech','TCS House, 2nd Floor, Raveline Street, Fort, Mumbai - 400001'),
('Infosys','Infotech','Electronics City, Hosur Road, Bengaluru - 560100'),
('Wipro','Infotech','Doddakannelli, Sarjapur Road, Bengaluru - 560035'),
('HDFC','Financials','HDFC House, H T Parekh Marg, 165-166, Backbay Reclamation, Churchgate, Mumbai - 400020'),
('Tata Steel', 'Iron and Steel','2nd Floor, Bombay House, 24, Homi Mody Street, Fort, Mumbai - 400001'),
('Steel Authority of India','Iron and Steel','Core I, 20th Floor, Scope Minar, Laxmi Nagar District Center, Delhi – 110092'),
('JSW Steel Ltd','Iron and Steel','JSW Centre, Bandra Kurla Complex, Near MMRDA Grounds, Bandra East, Mumbai - 400051'),
('Coal India', 'Mining', 'Coal Bhawan, Premise No-04 MAR,, Plot No-AF-III,Action Area-1A, Newtown, Rajarhat, Kolkata - 700156'),
('Bharti Airtel','Telecom','Interface Building 7, 7th Floor, New Link Road, Malad West, Mumbai - 400064'),
('Vodafone India', 'Telecom', 'Vodafone House, Peninsula Corporate Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai - 400013'),
('Tata Power', 'Utilities', 'B-12, 2nd Floor, Shatabdi Bhavan, Sector-04, Noida - 201301'),
('State Bank of India','Banking', '18, Devdas Kamlleg Block, Synergy Building, Bandra Kurla Complex, Mumbai - 400051'),
('Suzlon','Alternative Energy','Suzlon House, 5 Shrimali Society, Navrangpura, Ahmedabad - 380009'),
('ONGC','Oil & Gas', 'Deendayal Urja Bhawan, 5A, Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070'),
('Indian Oil','Oil & Gas', '3079, J B Tito Marg, Sadiq Nagar, Delhi - 110049'),
('Reliance','Conglomerate', 'Reliance Industries Limited, Maker Chambers - IV, Nariman Point, Mumbai - 400021'),
('Bharat Petroleum','Oil & Gas', 'Bharat Bhavan, 4 and 6 Currimbhoy Road, Ballard Estate, Mumbai - 400001'),
('Rajesh Exports','Gems', 'No 4, Batavia Chambers, Kumara Krupa Road, Kumara Park East, Bangalore - 560001'),
('Bombay Dyeing','Textiles', 'Neville House, J.N. Heredia Marg, Ballard Estate, Mumbai - 400038'),
('Britannia','Food Products', '5-1A Hungerford Street, Kolkata - 700017 '),
('DLF','Real Estate', 'DLF Gateway Tower, R Block, DLF City Phase – III, Gurugram – 122002'),
('Eureka Forbes','Consumer Goods', '701, 7th Floor, Marathon Innova Marathon NextGen, Off Ganpatrao Kadam Marg Lower Parel, Mumbai - 400013'),
('Flipkart','Ecommerce', 'Vaishnavi Summit, Ground Floor, 7th Main, 80 Feet Road, 3rd Block, Koramangala, Bengaluru - 560034'),
('Haldirams','Food Products', '145-146, Old Pardi Naka, Bhandara Road, Nagpur – 440032'),
('Sun Pharmaceuticals','Pharmaceuticals', 'CTS No. 201 B/1, Western Express Highway, Goregaon (E), Mumbai - 400063'),
('Karnataka Bank','Banking', 'Karnataka Bank Limited, Post Box No. 599, Mahaveera Circle, Kankanady, Mangalore - 575002'),
('Larsen & Toubro','Engineering', 'L&T House, N.M. Marg, Ballard Estate, Mumbai, Maharashtra - 400001'),
('MRF','Rubber Products', '826 Tarapore Towers 5th Floor, Mount Road, Chennai - 600002'),
('Maruti Suzuki','Automotive', '1, Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070'),
('Parle','Food Products', 'V S Khandekar Marg, North Level Crossing Road, Vile Parle East, Mumbai - 400057'),
('Royal Enfield','Automotive', '105, Kamala Gardens, Mount Poonamalle High Rd, Kattupakkam, Chennai, Tamil Nadu - 600056'),
('SpiceJet','Aviation', '319, Udyog Vihar, Phase IV, Gurugram - 122016'),
('Central Bank of India', 'Banking', '14th Floor, Chandermukhi Building, Nariman Point, Mumbai - 400001'),
('Allahabad Bank', 'Banking', '2, N.S. Road, Kolkata - 700001'),
('Andhra Bank', 'Banking', 'Dr.Pattabhi Bhavan 5-9-11 Saifabad, Hyderabad - 500004'),
('NTPC Limited','Utilities', 'NTPC Bhawan, SCOPE Complex, Institutional Area, Lodhi Road, New Delhi - 110003'),
('Oriental Bank of Commerce', 'Banking', '1st floor, Plot No 5, Sector 32, Institutional Area, Gurugram - 122001'),
('Indiabulls','Financial Services', 'Indiabulls House, 448-451, Udyog Vihar, Phase V, Gurugram - 122001'),
('Adani Ports & SEZ Limited','Shipping', 'Adani House, Mithakhali Six Roads, Navarangpura, Ahmedabad - 380009'),
('Asian Paints','Chemicals', 'Asian Paints House 6A, Shantinagar, Santacruz (E), Mumbai - 400055'),
('Zomato','Food Delivery', '139 P, Gurgaon Sector 44, Gurugram - 122003'),
('Dabur','FMCG', '8/3, Asaf Ali Road, New Delhi – 110002')]

# 4-tuples of form (name, segments, sebi_no, registered office)
brokerage_tuples = [
('Airan Finstocks Private Limited','Capital Market, Currency Futures, Futures & Options, IPO','INZ000214031', '407, The Grand Mall, Opp SBI Zonal Office, Ambawadi, Ahmedabad - 380015'),
('Alacrity Securities Ltd','Capital Market, Futures & Options','INZ000215936', '1062, Hubtown Solaris, Prof NS Phadke Marg, Andheri (E), Mumbai - 400069'),
('Beeline Broking Ltd','Capital Market, Currency Futures, Futures & Options','INZ000000638', 'Vishwa Complex, 1st Floor Opp. Jain Derasar, Navrangpura, Ahmedabad - 380009'),
('CIL Securities Ltd','Capital Market, Currency Futures, Futures & Options, Mutual Funds, IPO','INZ000169535', '214 Raghava Ratna Towers, Chirag Ali Lane Abids, Hyderabad, Telangana - 500001'),
('Intellect Stock Broking Ltd','Capital Market, Commodity, Currency Futures, Debt Market, Futures & Options','INZ000191632', '232 Chittaranjan Avenue, 7th Floor, Kolkata - 700006'),
('Karvy Stock Broking Ltd','Capital Market, Commodity, Currency Futures, Debt Market, Futures & Options, Mutual Funds, WDM, IPO','INZ000172733', 'Avenue 4, Street No. 1 Banjara Hills, Hyderabad – 500034'),
('Market Creators Ltd','Capital Market, Commodity, Currency Futures, Futures & Options, Mutual Funds, IPO','INZ000206338', '70, Sampatrao Colony, Opp. Masonic Hall, Productivity Road, Vadodara - 390007'),
('Nariman Finvest Private Ltd','Capital Market, Currency Futures, Debt Market, Futures & Options, IPO','INZ000229936', '4, 1st Floor, Phoenix Building, 457, SVP Road, Prarthana Samaj, Mumbai - 400004'),
('Quantum Global Solutions Ltd','Capital Market, Currency Futures, Futures & Options, IPO','INB230825632', 'Quantum Global Securities Ltd. 608, 6th Floor, Pragati Tower 26, Rajendra Place, Delhi - 110008'),
('Saffron Equity Advisors Pvt Ltd','Capital Market','INZ000174937','H-130, Bhoomi Green, Raheja Estate, Kulupwadi, Borivali (E), Mumbai - 400066')]


designations = ['CEO', 'CFO', 'Managing Director', 'President', 'Independent Director', 'Regular Employee']

banks = ['State Bank of India', 'Karnataka Bank', 'Oriental Bank of Commerce', 'Allahabad Bank', 'ICICI Bank', 'Yes Bank',
        'Axis Bank', 'Bank of Baroda', 'Punjab National Bank', 'HDFC', 'IDBI', 'IndusInd Bank', 'Kotak Mahindra Bank',
        'HSBC', 'Bank of America', 'BNP Paribas', 'Citibank', 'Standard Chartered Bank']

cities = ['Mumbai','Delhi','Bangalore','Hyderabad','Ahmedabad','Chennai','Kolkata','Surat','Pune','Jaipur','Visakhapatnam','Kanpur','Nagpur','Lucknow','Thane','Bhopal','Indore','Patna','Vadodara']

city_probabilities = [
0.1495034655959970,
0.1322665283550740,
0.1013723146386230,
0.0818263618688147,
0.0669343189516240,
0.0562464032589577,
0.0539104606104302,
0.0536835807027644,
0.0375424606792560,
0.0366016936857863,
0.0360961102796400,
0.0332275129172673,
0.0289056801755576,
0.0278415723150087,
0.0221267147234246,
0.0216067966212797,
0.0199951105829876,
0.0202370581426084,
0.0200758558948992
]

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
    self.address = this_tuple[2]
    self.phone = StringGenerator('[7-9]{3}[\d]{7}').render()

class Brokerage:
  def __init__(self,index):
    this_tuple = brokerage_tuples[index]
    self.name = this_tuple[0]
    self.segments = this_tuple[1]
    self.sebi_no = this_tuple[2]
    self.address = this_tuple[3]
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
client_objects = [Client() for _ in range(200)] # create 200 random clients


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
          MERGE (brokerage)<-[:trades_through]-(client)-[:executed]->(trade)-[:part_of]->(company)''', # changed this last marge so that clients explicitly associated with trades for companies
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
  for i in range(1000):
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

(BROKERAGE)<-[:through]-(CLIENT)-[:executes]->(TRADE)-[:part_of]->(COMPANY)
'''
# first generate companies and brokerages
# then generate events, link to companies
# then generate clients, match to companies and brokerages, but only works_for/is_kmp/is_independent_director etc
# then generate trades and link back to companies, although this will take a bit of thought

# CYPHER QUERY FOR KMP WHO TRADE IN THEIR OWN COMPANY (not necessarily fraudulent, that will depend on trade and event timestamps)
# match(n:Client)-[:is_kmp_for]->(m:Company) with n,m match (n)-[:executed]-(t:Trade)-[:part_of]->(m) RETURN n.name as client, n.designation as designation, m.name as company, t.volume as volume, t.type as type, t.share_price as share_price, t.timestamp as timestamp

# I guess just generate law abiders first then try and hard code fraud cases later
# and then later on add some kind of history for share prices for each company - will need to associate share price at a timestamp and match to trade timestamps

