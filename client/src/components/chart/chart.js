import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { Toast } from 'reactstrap';
// can also do this.state.chartOptions
const options = {
    title: {
        text: 'Chart Name Here'
    },
    //   subtitle
    subtitle: {
        text: 'For: Company'
    },
    // Config for Y Axis
    yAxis: {
        title: {
            text: 'Some Data'
        }
    },
    //   X axis Naming here
    xAxis: {
        title: {
            text: "Some Title"
        },
        categories: ['A', 'B', 'C'],
    },
    series:
    [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }],
    // Plot Options
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },
    // Options on Right side
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
}

class Chart extends React.Component {

    render() {
        return (
            <div className="chart-container">

                <HighchartsReact Highcharts={Highcharts} options={options} />
            
            </div>
        )
    }
}
export default Chart;