import React from 'react'
import Highcharts, { color } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import '../../App.css'
require("highcharts/modules/accessibility")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/data")(Highcharts);


class TradeData1 extends React.Component {
    constructor(props) {
      super(props)

      this.owns_shares_in = []
      this.buy_prices = []
      this.sell_prices = []

      props.data.map(record => this.owns_shares_in.push(record.OwnsSymbol))
      props.data.map(record => this.buy_prices.push(record.BuyPrice))
      props.data.map(record => this.sell_prices.push(record.SellPrice))

      this.options={
          chart: {
              type: 'column'
          },
          title: {
              text: 'Trade Data',
              style: {
                color: '#73879C',
                fontWeight: 'bold'
            },
          },
          yAxis: {
              allowDecimals: false,
              title: {
                  text: 'Value (in Lakhs)'
              }
          },
          xAxis:{
            categories: this.owns_shares_in
            
          },
          tooltip: {
              formatter: function () {
                  return '<b>' + this.series.name + '</b><br/>' +
                      this.point.y + ' Lakh shares'
              }
          },
          series:[
              {
                  name:'Buy',
                  data: this.buy_prices,
                  color:'#4184f3'
              },
              {
              name:'Sell',
              data: this.sell_prices,
              color:"#df514c"
          }]
      }



    }
    render() {
        return (
            <div className="Trade-data1">
                	<HighchartsReact Highcharts={Highcharts} options={this.options}/>
            </div>
        )
    }
}

export default TradeData1