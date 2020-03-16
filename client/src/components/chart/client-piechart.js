import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'



class ClientPieChart extends React.Component {

    constructor(props) {
        super(props)
        
        this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Holdings',
                style: {
					color: '#3e5d7e',
					fontWeight: 'bold'
				}
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Holding',
                colorByPoint: true,                
                data: [{
                    name: 'Pledged',
                    y: this.props.data[0].Pledged,
                    sliced: false,
                    selected: true,
                    color: '#E74C3C'
                }, {
                    name: 'Free',
                    y: this.props.data[0].Free,
                    sliced: false,
                    selected: true,
                    color:"#1ABB9C"
                }]
            }]
        }
    }


   
    render() {
        return (
            <div className="clientchart">
                <div className="HighchartsReact">
                    <HighchartsReact Highcharts={Highcharts} options={this.options} className="card" id="piecont" />
                </div>
            </div>
        )
    }
}
export default ClientPieChart