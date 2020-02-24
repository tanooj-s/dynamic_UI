import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'

const options = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Shareholding Summary for GAIL (India) Ltd.'
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
            y: 52.13,
            sliced: true,
            selected: true
        }, {
            name: 'MF',
            y: 10.23
        }, {
            name: 'FII',
            y: 17.79
        }, {
            name: 'Other Institutions',
            y: 15.24
        }, {
            name: 'Public',
            y: 4.6
        }, {
            name: 'Other',
            y: 0
        }]
    }]
}

const options1 = {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Historical Promoter holding in GAIL (India) Ltd.'
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
            ['Promotor', 52.1],
            ['MF', 10.2],
            ['FII', 17.8],
            ['Other Institutions', 15.2],
            ['Public', 4.6],
            ['Other', 0.0]
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


class PieChart extends React.Component {



    render() {
        return (
            <div className="Chart">
                <div className="HighchartsReact">
            <HighchartsReact Highcharts={Highcharts} options={options} className="card" id="piecont" />

                </div>
                <div className="HighchartsReact">

            <HighchartsReact Highcharts={Highcharts} options={options1} className="card" id="barcont" />
            </div>
            </div>
        )
    }
}
export default PieChart