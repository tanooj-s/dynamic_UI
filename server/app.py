from flask import Flask, render_template, request, url_for, redirect, jsonify, session, make_response
from flask_cors import CORS, cross_origin # allow cross origin resource sharing for axios post
import json
import numpy as np
import pandas as pd
import ast


# -----"DATABASE"------

# each dataframe is a "table", could sql table later on

broker_profiling_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='member_profiles')
kmp_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='kmp')
authorized_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='authorized_personnel')

#reformat dates as strings
kmp_df['Date of Appointment'] = kmp_df['Date of Appointment'].apply(lambda x: x.strftime("%d-%m-%Y"))
authorized_df['Date of Appointment'] = authorized_df['Date of Appointment'].apply(lambda x: x.strftime("%d-%m-%Y"))


# create a dict that maps query_tab strings to dataframes for each "table"
table_map = {
	'broker_profile': broker_profiling_df,
	'broker_kmp': kmp_df,
	'broker_authorized': authorized_df,
	'company_profile': [],
	'company_shareholding': [],
	'company_board': [],
	'company_kmp': [],
	'company_events': [],
	'company_complaints': [],
	'indi_profile': [],
	'indi_trade_data': [],
	'indi_blacklist': [],
	'indi_alerts': [],
	'indi_balances': [],
	'indi_monthly_balances': [],
	'indi_m2m': []
}

def get_data(search_term, query_tab):
	# based on which query_tab is selected (from React state), select different table to return values from
	# only querying the name column right now
	this_df = table_map[query_tab]
	results = this_df.query('Name.str.contains("%s")' % (search_term), engine='python') # only query the dataframe based on Name column
	result_json = results.to_json(orient='records') # return results as a json of records (list of dicts where each dict is a row from the df)
	return result_json
#-----BACKEND---------

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
		response_data = get_data(search_term=request_data['search_term'], query_tab=request_data['query_tab'])
		print(response_data) # output response to terminal window
		return add_cors_headers(jsonify(response_data))

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

if __name__ == "__main__":
	app.run(debug=True)