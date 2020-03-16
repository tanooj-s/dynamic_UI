import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'
require("highcharts/modules/variwide")(Highcharts);




class TradeData extends React.Component {

    options={
        chart: {
            type: 'variwide'
        },

        title: {
            text: 'Trade Data for Current Month',
            style: {
                color: '#3e5d7e',
                fontWeight: 'bold'
            }
        },
        xAxis: {
            type: 'category'
        },
        legend: {
            enabled: false
        },

        series: [{
            name: 'Companies',
            data: [
                ['Itc', 50, 335504],
                ['Gail', 42, 277339],
                ['HDFC', 39, 421611],
                ['YesBank', 38, 462057],
                ['DBS', 35, 2228857],
                ['Dena', 34, 702641],
                ['Tata', 33, 215615],
                ['Avanti', 33, 3144050],
                ['Neha Foods', 32, 349344],
                ['Dynamics', 30, 275567],
                ['Reliance', 27, 1672438],
                ['HUL', 26, 2366911],

            ],
            dataLabels: {
                enabled: true,
                format: '{point.y:.0f}'
            },
            tooltip: {
                pointFormat: 'Volume: <b> {point.y} millions</b><br>' +
                    'Price: <b>Rs {point.z} </b><br>'
            },
            colorByPoint: true
        }]
    }

    render() {
        return (
            <div className="HighchartsReact">
            <div className="TradeData">
					<HighchartsReact Highcharts={Highcharts} options={this.options} id="TradeData" />
				</div>
            </div>
            )
    }

}

export default TradeData
