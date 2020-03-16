import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'

const options={
	chart: {
        type: 'column'
    },
    title: {
        text: 'Share Holding',
        style: {
            color: '#73879C',
            fontWeight: 'bold'
        },
    },
 
   
    legend:{
    enabled:false
    },
    xAxis: {
        categories: [
            'Tata',
            'Infosys',
            'Dmart',
            'Reliance',
            'Yes Bank',
            'Avanti Feeds',
            'Hdfc'
        ],
        crosshair: true,
         title: {
            text: 'Security'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Volume'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name} </td>' +
            '<td style="padding:0"><b>{point.y}</b> Shares</td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
         dataLabels: {
                enabled: true
            }
    },
    series: [{
        name: ' ',
        data: [10000,9000,3000,3700,12000,500,1800],
        color:"rgb(16,234,59)"
    }]
}

class ShareholdingVolume extends React.Component {
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div>
				<HighchartsReact Highcharts={Highcharts} options={this.options}/>
			</div>		
		)
	}
}

export default ShareholdingVolume