from flask import Flask, render_template, request, url_for, redirect, jsonify, session, make_response
from flask_cors import CORS, cross_origin # allow cross origin resource sharing for axios post
import json
import numpy as np
import pandas as pd
import ast
from neo4j import GraphDatabase
import networkx



# -----"DATABASE"------

# each dataframe is a "table", could sql table later on
# load all data for selected company/brokerage/client
print ("reading excel sheets......")
broker_profile_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='member_profiles')
broker_kmp_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='kmp')
broker_authorized_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='authorized_personnel')

company_profile_df = pd.read_excel(io='company_data.xlsx',sheet_name='CompanyProfile')
company_kmp_df = pd.read_excel(io='company_data.xlsx',sheet_name='KeyManagementPerson')
company_shareholding_df = pd.read_excel(io='company_data.xlsx',sheet_name='ShareholdingPattern')
company_events_df = pd.read_excel(io='company_data.xlsx',sheet_name='Events')
company_board_meetings_df = pd.read_excel(io='company_data.xlsx',sheet_name='BoardMeetings')
company_complaints_df = pd.read_excel(io='company_data.xlsx',sheet_name='Complaints')

client_securities_df = pd.read_excel(io='client_data.xlsx',sheet_name='Securities')
client_m2m_df = pd.read_excel(io='client_data.xlsx',sheet_name='M2M')
client_alerts_df = pd.read_excel(io='client_data.xlsx',sheet_name='NCLAlertFile')
client_trades_df = pd.read_excel(io='client_data.xlsx',sheet_name='Trades')
client_holdings_df = pd.read_excel(io='client_data.xlsx',sheet_name='HoldingStatement')
client_securities_df = pd.read_excel(io='client_data.xlsx',sheet_name='Securities')
client_top_trades_df = pd.read_excel(io='client_data.xlsx',sheet_name='TopTradingStocks')
client_pledged_df = pd.read_excel(io='client_data.xlsx',sheet_name='Pledged')
client_sebialerts_df=pd.read_excel(io='client_data.xlsx',sheet_name="SebiAlerts")
client_tradedesc_df=pd.read_excel(io='client_data.xlsx',sheet_name="TradeDiscrepancyReport")

#reformat dates as strings
broker_kmp_df['Date of Appointment'] = broker_kmp_df['Date of Appointment'].apply(lambda x: x.strftime("%d-%m-%Y"))
broker_authorized_df['Date of Appointment'] = broker_authorized_df['Date of Appointment'].apply(lambda x: x.strftime("%d-%m-%Y"))

company_kmp_df['Date of Appointment'] = company_kmp_df['Date of Appointment'].apply(lambda x: x.strftime("%d-%m-%Y"))
company_events_df['Date'] = company_events_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y %H:%M:%S"))
company_board_meetings_df['MeetingDate'] = company_board_meetings_df['MeetingDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
company_board_meetings_df['BroadcastDate'] = company_board_meetings_df['BroadcastDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
company_complaints_df['Date'] = company_complaints_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))

client_securities_df['LastBalancedDate'] = client_securities_df['LastBalancedDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_securities_df['FileUploadDate'] = client_securities_df['FileUploadDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_m2m_df['Date'] = client_m2m_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_alerts_df['Date'] = client_alerts_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_alerts_df['LastUpdatedDate'] = client_alerts_df['LastUpdatedDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_alerts_df['TDate'] = client_alerts_df['TDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_alerts_df['NextTDate'] = client_alerts_df['NextTDate'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_trades_df['Date'] = client_trades_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_holdings_df['Date'] = client_holdings_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_top_trades_df['Date'] = client_top_trades_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_sebialerts_df['Date'] = client_sebialerts_df['Date'].apply(lambda x: x.strftime("%d-%m-%Y"))
client_tradedesc_df['Date']= client_tradedesc_df['Date'].apply(lambda x:x.strftime("%d-%m-%Y"))


# ------------------------------------------------------------------------------------------------------------------------------------------------------------------



# create a dict that maps query_type strings to profile dataframes for each
profile_map = {
	'company': company_profile_df,
	'indi': client_securities_df,
	'broker': broker_profile_df
}

# create a dictionary to map individual company names to CompanyIDs, then search every company df by CompanyID
#unique_companies = list(set(company_profile_df.Name.values))
#company_to_id = {company:idx for (idx,company) in enumerate(unique_companies)}

def get_data(search_term, query_type):
	# based on which query_tab is selected (from React state), select different table to return values from
	# only querying the name column right now
	result_json = dict()
	profile_df = profile_map[query_type]

	# should somehow be doing some kind of search by ID instead - or joining SQL tables
	if (query_type == 'company'):
		profile_results = profile_df.query('Name.str.contains("%s")' % (search_term), engine='python').to_json(orient='records') # search by name regardless of query type
		company_kmp_results = company_kmp_df.query('CompanyName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		company_shareholding_results = company_shareholding_df.query('Name.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		company_events_results = company_events_df.query('Name.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		company_complaints_results = company_complaints_df.query('CompanyName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		company_board_meetings_results = company_board_meetings_df.query('CompanyName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')


		result_json['profile'] = ast.literal_eval(profile_results) # add profile dict to results
		result_json['kmp'] = ast.literal_eval(company_kmp_results)
		result_json['shareholding'] = ast.literal_eval(company_shareholding_results)
		result_json['events'] = ast.literal_eval(company_events_results)
		result_json['board_meetings'] = ast.literal_eval(company_board_meetings_results)
		result_json['complaints'] = ast.literal_eval(company_complaints_results)

	elif (query_type == 'broker'):
		profile_results = profile_df.query('Name.str.contains("%s")' % (search_term), engine='python').to_json(orient='records') # search by name regardless of query type
		broker_kmp_results = broker_kmp_df.query('CompanyName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		broker_authorized_results = broker_authorized_df.query('CompanyName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')

		result_json['profile'] = ast.literal_eval(profile_results) # add profile dict to results
		result_json['kmp'] = ast.literal_eval(broker_kmp_results)
		result_json['authorized'] = ast.literal_eval(broker_authorized_results)


	# may need to orient records as values instead - but first get a handle on what the data will look like and what format is wanted before modifying anything
	elif (query_type == 'indi'):
		profile_df = client_securities_df[['ClientName', 'UCC', 'TMCode', 'PAN', 'Email', 'Phone', 'EODFundBalance', 'FundBalanceNSE', 'Address', 'BankName', 'AccountNumber', 'BeneficiaryName', 'DepositoryName', 'TradeMemberName', 'ClientCategory', 'DematAccountNo']]
		profile_results = profile_df.query('ClientName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_securities_results = client_securities_df.query('ClientName.str.contains("%s")' % (search_term), engine='python')
		client_m2m_results = client_m2m_df.query('MemberName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_alerts_results = client_alerts_df.query('MemberName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_trades_results = client_trades_df.query('TradingMember.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_holdings_results = client_holdings_df.query('ClientName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_top_trades_results = client_top_trades_df.query('ClientName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_pledged_results = client_pledged_df.query('ClientName.str.contains("%s")' % (search_term), engine='python').to_json(orient='records')
		client_sebialerts_results = client_sebialerts_df.query('ClientName.str.contains("%s")'% (search_term),engine='python').to_json(orient='records')
		client_tradedesc_results = client_tradedesc_df.query('ClientName.str.contains("%s")'%(search_term),engine='python').to_json(orient='records')

		result_json['profile'] = ast.literal_eval(profile_results)
		result_json['securities'] = ast.literal_eval(client_securities_results.to_json(orient='records'))
		result_json['m2m'] = ast.literal_eval(client_m2m_results)
		result_json['alerts'] = ast.literal_eval(client_alerts_results)
		result_json['trades'] = ast.literal_eval(client_trades_results)
		result_json['holdings'] = ast.literal_eval(client_holdings_results)
		result_json['top_trades'] = ast.literal_eval(client_top_trades_results)
		result_json['pledged'] = ast.literal_eval(client_pledged_results)
		result_json['sebialerts'] = ast.literal_eval(client_sebialerts_results)
		result_json['tradedesc'] = ast.literal_eval(client_tradedesc_results)

	return result_json
#-----BACKEND---------
print("initializing backend....")
app = Flask(__name__, template_folder="../client/public", static_folder="../client/src")
# https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS - need to add config options for security reasons

@app.route("/", methods = ['GET','POST','OPTIONS']) # add OPTIONS for preflight for CORS
def index():
	if request.method == 'OPTIONS': # preflight for CORS
		return cors_preflight_response()
	elif request.method == 'POST':
		print(request)
		request_data = ast.literal_eval(request.get_data(as_text=True)) # request.get_data() returns a string so convert it to a dict using literal_eval
		print(request_data) # output request to terminal window
		response_data = get_data(search_term=request_data['search_term'], query_type=request_data['query_type'])
		print(response_data) # output response to terminal window
		return add_cors_headers(jsonify(response_data))
	return 0

# actual response back to frontend
def add_cors_headers(resp):
	resp.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
	return resp

# response to intial "preflight" request made by frontend POST request to see which headers are allowed
def cors_preflight_response():
	resp = make_response()
	resp.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
	resp.headers.add("Access-Control-Allow-Headers", "*")
	resp.headers.add("Access-Control-Allow-Methods", "*")
	return resp

# function that gets called immediately and pushes all company-client relationship data to a neo4j instance
def push_to_db():
	return 0




if __name__ == "__main__":
	app.run(debug=True)