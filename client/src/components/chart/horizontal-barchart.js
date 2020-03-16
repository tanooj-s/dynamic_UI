import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'

class HorizontalBarChart extends React.Component {
	constructor(props) {
		super(props)

		this.sell_data = []
		this.buy_data = []
		this.trade_dates = []

		// need to push values from each record into array to pass to chart - is an array of records
		props.data.map(record => this.sell_data.push(-Math.abs(record.SellPrice)))
		props.data.map(record => this.buy_data.push(record.BuyPrice))
		props.data.map(record => this.trade_dates.push(record.Date))

		this.options = {
			chart: {
				type: 'column',
				inverted: true,
			},

			title: {
				text: "Trades",
				style: {
					color: '#3e5d7e',
					fontWeight: 'bold'
				}
			},

			plotOptions: {
				series: {
					pointStart: 0,
					cursor: 'pointer',
					pointPadding: 0,
					groupPadding: 0,
					states: {
						select: {
							color: null,
							borderWidth: 20,
							borderColor: 'Blue'
						}
					}
				},
				column: {
					align: 'center',
					stacking: 'normal',
					threshold: 0,
					dataLabels: {
						enabled: false,
						style: {
							textShadow: '0 0 3px black',
						}
					}
				},
			},

			xAxis: {
				categories: this.trade_dates
			},

			yAxis: {
				title: 'Trade Volume',

				stackLabels: {
					enabled: false,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				},
				labels: {
					formatter: function () {
						return (Math.abs(this.value))
					}
				}
			},

			series: [
				{
					name: 'Sell Value',
					color: "red",					
					data: this.sell_data
				},
				{
					name: 'Buy Value',
					data: this.buy_data
				}]
		}
	}

	render() {
		return (
			<div className="HorizontalBarChart">
				<div className="HighchartsReact">
					<HighchartsReact Highcharts={Highcharts} options={this.options} id="horizontalBarChart" />
				</div>
			</div>
		)
	}


}

export default HorizontalBarChart