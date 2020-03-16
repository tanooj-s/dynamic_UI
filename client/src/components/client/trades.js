import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';

function Trades(props) {
    return (
        <div className="Events">
          <h4>{props.client_name}</h4>
          <h4>Trade Data</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Date</th>
                    <th>Trading Member</th>
                    <th>Client Code</th>
                    <th>Symbol</th>
                    <th>ISIN</th>
                    <th>Share Volume</th>
                    <th>Buy Price</th>
                    <th>Sell Price</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.Date}</td>
                      <td>{item.TradingMember}</td>
                      <td>{item.ClientCode}</td>
                      <td>{item.OwnsSymbol}</td>
                      <td>{item.ISIN}</td>
                      <td>{item.Volume}</td>
                      <td>{item.BuyPrice}</td>
                      <td>{item.SellPrice}</td>

                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Trades