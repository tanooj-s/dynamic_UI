import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../../components/person.jpg'

function Trades(props) {
    return (
        <div className="Events">
          <h4>Trade Data</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Date</th>
                    <th>Trading Member</th>
                    <th>Client Code</th>
                    <th>Symbol</th>
                    <th>Security</th>
                    <th>ISIN</th>
                    <th>Buy Traded Value</th>
                    <th>Sell Trade Value</th>
                    <th>Buy Trade Quantity</th>
                    <th>Sell Trade Quantity</th>
                    <th>Dealer User Id</th>
                    <th>Dealer User Name</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.Date}</td>
                      <td>{item.TradingMember}</td>
                      <td>{item.ClientCode}</td>
                      <td>{item.Symbol}</td>
                      <td>{item.Security}</td>
                      <td>{item.ISIN}</td>
                      <td>{item.BuyTradeValue}</td>
                      <td>{item.SellTradeValue}</td>
                      <td>{item.BuyTradeQuantity}</td>
                      <td>{item.SellTradeQuantity}</td>
                      <td>{item.DealerUserId}</td>
                      <td>{item.DealerUserName}</td>
                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Trades