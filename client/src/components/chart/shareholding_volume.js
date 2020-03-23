import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'

class ShareholdingVolume extends React.Component {
	constructor(props){
		super(props)
		this.companies = []
		this.volumes = []
		props.data.map(record => this.companies.push(record.OwnsSymbol))
		props.data.map(record => this.volumes.push(record.Volume))
		this.options={
			chart: {
		        type: 'column'
		    },
		    title: {
		        text: 'Share Holding (as on 5th March)',
		        style: {
		            color: '#73879C',
		            fontWeight: 'bold'
		        },
		    },
		 
		   
		    legend:{
		    enabled:false
		    },
		    
		    xAxis: {
		    	categories: this.companies
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
		        data: this.volumes,
		        color:"purple"
		    }]
		}




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