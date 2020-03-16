import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'

class SecurityBalance extends React.Component {
    constructor (props) {
        super(props)

        this.pledged = []
        this.free = []
        this.dates = [] // map from records to each array

        props.data.map(record => this.pledged.push(record.Pledged))
        props.data.map(record => this.free.push(record.Free))
        props.data.map(record => this.dates.push(record.Date))

        this.options = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Security Balances',
                style: {
                    color: '#73879C',
                    fontWeight: 'bold'
                },
            },
            xAxis: {
                type: 'datetime' ,
                categories: this.dates,
                labels: {
                    format: "{value:%d-%b-%y}"

            }},
            yAxis: {
                min: 0,
                title: {
                    text: 'Value (in Lakhs)'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'Free',
                data: this.free,
                color:"rgb(16,191,234)"
                }, {
                name: 'Pledged',
                data: this.pledged,
                color:"rgb(65, 132, 243)",
                }
            ]

       
        }
    }
    render(){
        return (
            <div className="HighchartsReact-funds">
                    <HighchartsReact Highcharts={Highcharts} options={this.options} id="fundsnsec-chart" />

            </div>
        )
    }
}
export default SecurityBalance