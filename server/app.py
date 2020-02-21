from flask import Flask, render_template, request, url_for, redirect, jsonify
from flask_cors import CORS # allow cross origin resource sharing for axios post
import json
import numpy as np
import pandas as pd


# -----"DATABASE"------

# each dataframe is a "table", could be like a sql table later on

broker_profiling_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='member_profiles')
kmp_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='kmp')
authorized_df = pd.read_excel(io='brokerage_data.xlsx',sheet_name='authorized_personnel')


# create a dict that maps query_tab strings to dataframes for each "table"
table_map = {
	'broker_profile': broker_profiling_df,
	'broker_kmp': kmp_df,
	'broker_authorized': authorized_df
}

def get_data(search_term, query_tab):
	# based on which query_tab is selected (from frontend), select different table to return values from
	# only query the name column
	this_df = table_map[query_tab]
	results = this_df.query('Name.str.contains(%s)' % (query_tab.lower()), engine='python') # query the dataframe based on name column
	result_json = results.to_json(orient='records') # return results as a json of records (list of dicts where each dict is a row from the df)

#-----BACKEND---------

app = Flask(__name__, template_folder="../client/public", static_folder="../client/src")
CORS(app)

@app.route("/", methods = ['GET','POST'])
def index():
	if request.method == 'POST': # since we POST the state of the react app
		request_object = request.get_json() # get request from client (react app) as a json object
		data = get_data(search_term=request_object['search_term'], query_tab=request_object['query_tab'])
		return jsonify(data)
	return render_template("index.html")
	# based on this object which should contain information about the state/config of the app
	# access different values and query the appropriate dataframe
	# then return a response
	# do we need any redirects?

if __name__ == "__main__":
	app.run(debug=True)