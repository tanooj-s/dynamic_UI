import React from 'react'
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts'
import '../../App.css'

class M2MClient extends React.Component {
  constructor(props) {
    super(props)
    this.data_points = [] // = [[x,y], [x,y]]
    // year month date
    props.data.map(record => this.data_points.push([Date.UTC(parseInt(record.Date.substring(6, 10)), parseInt(record.Date.substring(3, 5)) - 1, parseInt(record.Date.substring(0, 2))), record.M2MLoss]))

    this.options = {
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
        pointFormat: '{point.x:%Y-%m-%d}, {point.y} Lakhs'
      },
      series: [{
        name: "M2M",
        data: this.data_points,
        enabled: true,
        zones: [
          {
            value: 750,
            color: 'blue'
          }, 
          {
            color: 'red'
          }
        ]      }]
    }
  }
  render() {
    return (
      <div className="m2mclient-container">
        <HighchartsReact Highcharts={Highcharts} options={this.options} />
      </div>
    )
  }
}

export default M2MClient