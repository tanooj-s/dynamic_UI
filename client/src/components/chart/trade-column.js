import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'

class TopTradeColumn extends React.Component {
	constructor(props) {
		super(props)

		this.company_1_sell_data = []
		this.company_1_buy_data = []
		this.company_2_sell_data = []
		this.company_2_buy_data = []
		this.company_3_sell_data = []
		this.company_3_buy_data = []
		this.trade_dates = []

		props.data.map(record => this.company_1_sell_data.push(record.Company1Sell))
		props.data.map(record => this.company_1_buy_data.push(record.Company1Buy))
		props.data.map(record => this.company_2_sell_data.push(record.Company2Sell))
		props.data.map(record => this.company_2_buy_data.push(record.Company2Buy))
		props.data.map(record => this.company_3_sell_data.push(record.Company3Sell))
		props.data.map(record => this.company_3_buy_data.push(record.Company3Buy))
		props.data.map(record => this.trade_dates.push(record.Date))

		this.options = {
			chart: {
				type: 'column',
				inverted: true,
			}
			title: {
				text: "Trade Quantities"
			},
			xAxis: {
				categories: this.trade_dates
			},
			yAxis: {
				title: "Trade Quantity",
				min: 0,
			}
			plotOptions: {
				column: {
					grouping: false,
					shadow: true,
					borderWidth: 0,
				}
			}
			series: [{
				name: 'Buy',
				data: this.buy_data,
				color: 'rgba(165,170,217,1)',

			}]
		}

	}
}

export default TopTradeColumn