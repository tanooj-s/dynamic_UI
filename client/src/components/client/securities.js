import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';

function Securities(props) {
    return (
        <div className="Events">
          <h4>{props.client_name}</h4>
          <h4>Securities</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>End of Day Fund Balance</th>
                    <th>Fund Balance NSE</th>
                    <th>Net Across Exchanges</th>
                    <th>End of Day Securities Balance</th>
                    <th>Total ISIN</th>
                    <th>Total Quantity Securities</th>
                    <th>Details Securities Pledged</th>
                    <th>Quantity Securities Pledged</th>
                    <th>Funds Raised</th>
                    <th>Last Balanced Date</th>
                    <th>File Upload Date</th>
                    <th>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.EODFundBalance}</td>
                      <td>{item.FundBalanceNSE}</td>
                      <td>{item.NetAcrossExchange}</td>
                      <td>{item.EODSecuritiesBalance}</td>
                      <td>{item.TotalISIN}</td>
                      <td>{item.TotalQuantitySecurities}</td>
                      <td>{item.DetailsSecuritiesPledged}</td>
                      <td>{item.QuantitySecuritiesPledged}</td>
                      <td>{item.FundsRaised}</td>
                      <td>{item.LastBalancedDate}</td>
                      <td>{item.FileUploadDate}</td>
                      <td>{item.Month}</td>
                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Securities