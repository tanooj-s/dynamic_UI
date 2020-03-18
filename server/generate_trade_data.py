import numpy as np
import pandas as pd
import datetime
import csv
import string
import random

clients = [
  {'name': 'Viral Sanghavi', 'works_for': 'TATA Motors', 'client_code': 1},
  {'name': 'Ruby Lobo', 'works_for': 'Gail', 'client_code': 2},
  {'name': 'Adagatla Mamata', 'works_for': 'ITC', 'client_code': 3},
  {'name': 'Deepak Mishra', 'works_for': 'Cadila', 'client_code': 4},
  {'name': 'Tanooj Shah', 'works_for': 'HDFC', 'client_code': 5},
]
companies = ['TATA Motors', 'Gail', 'ITC', 'Cadila', 'HDFC', 'SBIN', 'Suzlon', 'ONGC', 'Indian Oil', 'Reliance', 'Bharat Petroleum',
'Rajesh Exports', 'Bombay Dyeing', 'Britannia', 'DLF', 'Eureka Forbes', 'Flipkart', 'Haldirams', 'Karnataka Bank', 'Larsen & Toubro',
'MRF', 'Maruti Suzuki', 'Parle', 'Royal Enfield', 'SpiceJet', 'Indiabulls', 'Zomato', 'Dabur']

# dates between 1st Feb and 31st March
start_date = datetime.datetime.strptime("01-02-2020", "%d-%m-%Y")
end_date = datetime.datetime.strptime("31-03-2020", "%d-%m-%Y")
generated_dates = [start_date + datetime.timedelta(days=x) for x in range(0, (end_date-start_date).days)]
generated_dates = [date.strftime("%m/%d/%Y") for date in generated_dates]

def execute_trade():
  client_index = np.random.randint(0, 5)
  company_index = np.random.randint(0, len(companies))

  this_client = clients[client_index]
  this_company = companies[company_index]

  this_trade_volume = 100*np.random.random_integers(100) # random share volumes up to 10000 in intervals of 100
  this_sell_price_per_share = float("{0:.2f}".format(100*np.random.random_sample())) # random value upto 100, only two decimal points
  this_buy_price_per_share = float("{0:.2f}".format(100*np.random.random_sample()))
  # ^^ try to actually link these with companies instead of being totally random
  this_buy_price = float(this_trade_volume)*this_buy_price_per_share
  this_sell_price = float(this_trade_volume)*this_sell_price_per_share

  return {
    'Date': np.random.choice(a = generated_dates),
    'TradingMember': this_client['name'],
    'WorksFor': this_client['works_for'],
    'ClientCode': this_client['client_code'],
    'OwnsSymbol': this_company,
    'Security': np.random.choice(a = ['BSE','NSE'], p = [0.5, 0.5]),
    'ISIN': int(''.join(random.choices(string.digits, k = 12))), # 12 digit ISIN code
    'Volume': this_trade_volume,
    'BuyOrSell': np.random.choice(a = ['Buy','Sell'], p = [0.5, 0.5]),
    'SellPrice': this_sell_price,
    'BuyPrice': this_buy_price,
    'SellPricePerShare': this_sell_price_per_share,
    'BuyPricePerShare': this_buy_price_per_share,
    'DealerUserId': ''.join(random.choices(string.ascii_uppercase, k = 6)), # 6 character string
    'DealerUserName': ''.join(random.choices(string.ascii_lowercase, k = 8)) # 8 character lowercase string
    }

with open('trades_gen.csv', 'w') as f:
  fieldnames = ['Date', 'TradingMember', 'WorksFor', 'ClientCode', 'OwnsSymbol', 'Security', 'ISIN', 'Volume', 'BuyOrSell', 'SellPrice', 'BuyPrice', 'SellPricePerShare', 'BuyPricePerShare', 'DealerUserId', 'DealerUserName']
  writer = csv.DictWriter(f, fieldnames)
  writer.writeheader()
  for i in range(1000):
    writer.writerow(execute_trade())
    print ("Executed trade " + str(i))


