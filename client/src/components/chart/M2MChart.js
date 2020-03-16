import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import '../../App.css'

class M2MClient extends React.Component{
    constructor(props) {
      super(props)
      this.data_points = [] // = [[x,y], [x,y]]

      props.data.map(record => this.data_points.push([Date.UTC(parseInt(record.Date.substring(6,10)),parseInt(record.Date.substring(3,5)),parseInt(record.Date.substring(0,2))), record.NetBuy]))

      this.options={
          chart: {
              type: 'scatter',
            },
            title: {
              text: 'M2M Losses',
              style: {
                color: '#73879C',
                fontWeight: 'bold'
              },
            },
            xAxis: {
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: 'Value (in Lakhs)'
              }
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x}, {point.y} Lakhs'
            },           
            series: [{
                      name:"M2M",
                      data: this.data_points,
                      datalabels: {
                        formatter: function() {
                          if ( this.data_point.name>100) 
                            return '<span style="color: red;">'+this.point.name+'</span>';
                          else
                            return this.point.name;
                        },
                        enabled:true
                      }
            }]
      }
    }
    render(){
        return(
            <div className="m2mclient-container">
                <HighchartsReact Highcharts={Highcharts} options={this.options}/>
            </div>
        )
    }
}

export default M2MClient