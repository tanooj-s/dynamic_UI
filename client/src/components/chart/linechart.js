import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
const options = {
  title: {
    text: 'Trade Data For Year 2014'
  },


  yAxis: {
    title: {
      text: 'Balance in Rupees'
    }
  },

  xAxis: {
    type: 'datetime',
    tickInterval: 1000 * 3600 * 24 * 30 // 1 month
  },


  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 1,
    }
  },

  series: [{
    name: 'ITC (No Of Share: 10500) ',
    data: [{
      x: Date.UTC(2014, 0),
      y: 160
    },
    {
      x: Date.UTC(2014, 1),
      y: 163
    },
    {
      x: Date.UTC(2014, 2),
      y: 169
    },
    {
      x: Date.UTC(2014, 3),
      y: 165
    },
    {
      x: Date.UTC(2014, 4),
      y: 170
    },
    {
      x: Date.UTC(2014, 5),
      y: 162
    },
    {
      x: Date.UTC(2014, 6),
      y: 159
    },
    {
      x: Date.UTC(2014, 7),
      y: 160
    },
    {
      x: Date.UTC(2014, 8),
      y: 168
    },
    {
      x: Date.UTC(2014, 9),
      y: 171
    },
    {
      x: Date.UTC(2014, 10),
      y: 174
    },
    {
      x: Date.UTC(2014, 11),
      y: 178
    },

    ]
  },
  {
    name: 'Yes Bank (No Of Share: 500)',
    data: [{
      x: Date.UTC(2014, 0),
      y: 160
    },
    {
      x: Date.UTC(2014, 1),
      y: 150
    },
    {
      x: Date.UTC(2014, 2),
      y: 143
    },
    {
      x: Date.UTC(2014, 3),
      y: 138
    },
    {
      x: Date.UTC(2014, 4),
      y: 128
    },
    {
      x: Date.UTC(2014, 5),
      y: 120
    },
    {
      x: Date.UTC(2014, 6),
      y: 118
    },
    {
      x: Date.UTC(2014, 7),
      y: 111
    },
    {
      x: Date.UTC(2014, 8),
      y: 106
    },
    {
      x: Date.UTC(2014, 9),
      y: 101
    },
    {
      x: Date.UTC(2014, 10),
      y: 95
    },
    {
      x: Date.UTC(2014, 11),
      y: 88
    },

    ]
  },
  {
    name: 'GAIL (No Of Share: 5500)',
    data: [{
      x: Date.UTC(2014, 0),
      y: 112
    },
    {
      x: Date.UTC(2014, 1),
      y: 120
    },
    {
      x: Date.UTC(2014, 2),
      y: 125
    },
    {
      x: Date.UTC(2014, 3),
      y: 129
    },
    {
      x: Date.UTC(2014, 4),
      y: 134
    },
    {
      x: Date.UTC(2014, 5),
      y: 139
    },
    {
      x: Date.UTC(2014, 6),
      y: 147
    },
    {
      x: Date.UTC(2014, 7),
      y: 151
    },
    {
      x: Date.UTC(2014, 8),
      y: 152
    },
    {
      x: Date.UTC(2014, 9),
      y: 159
    },
    {
      x: Date.UTC(2014, 10),
      y: 162
    },
    {
      x: Date.UTC(2014, 11),
      y: 163
    },

    ]
  }],

  responsive: {
    rules: [{
      condition: {
        maxWidth: 400
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
class LineChart extends React.Component {

  render() {
    return (
      <HighchartsReact Highcharts={Highcharts} options={options} />
    )
  }
}

export default LineChart