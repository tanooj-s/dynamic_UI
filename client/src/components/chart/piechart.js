import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'



class PieChart extends React.Component {

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
                text: 'Shareholding Summary for ' + this.props.company_name
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
                    name: 'Promoter',
                    y: this.props.data[0].Promoter,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Employee Trusts',
                    y: this.props.data[0].EmployeeTrusts,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Public',
                    y: this.props.data[0].Public,
                    sliced: true,
                    selected: true
                }, {
                    name: 'MF',
                    y: this.props.data[0].MF,
                    sliced: true,
                    selected: true
                }, {
                    name: 'FII',
                    y: this.props.data[0].FII,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Other',
                    y: this.props.data[0].Other,
                    sliced: true,
                    selected: true
                }]
            }]
        }

        this.options1 = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Historical Promoter holding in ' + this.props.company_name
            },
            subtitle: {
                text: 'Holdings(in %)'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Holdings (in %)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Holdings</b>({point.y:.1f} %)'
            },
            series: [{
                name: 'Population',
                data: [
                    ['Promoter', this.props.data[0].Promoter],
                    ['Employee Trusts', this.props.data[0].EmployeeTrusts],
                    ['Public', this.props.data[0].Public],
                    ['MF', this.props.data[0].MF],
                    ['FII', this.props.data[0].FII],
                    ['Other', this.props.data[0].Other]
                ],
                dataLabels: {
                    enabled: true,
                    rotation: 0,
                    color: 'black',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 6, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: ' sans-serif'
                    }
                }
            }]
        }

    }


   
    render() {
        return (
            <div className="Chart">
                <div className="HighchartsReact">
                    <HighchartsReact Highcharts={Highcharts} options={this.options} className="card" id="piecont" />
                </div>
                <div className="HighchartsReact">
                    <HighchartsReact Highcharts={Highcharts} options={this.options1} className="card" id="barcont" />
                </div>
            </div>
        )
    }
}
export default PieChart