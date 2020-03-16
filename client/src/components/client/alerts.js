import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';

function Alerts(props) {
    return (
        <div className="Events">
          <h4>{props.client_name}</h4>
          <h4>Alerts</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Bhavcopy</th>
                    <th>Date</th>
                    <th>Obligation Quantity</th>
                    <th>Total Quantity</th>
                    <th>NSDL Quantity</th>
                    <th>NSDL Processflag</th>
                    <th>NSDL Remarks</th>
                    <th>CDSL Quantity</th>
                    <th>CDSL Processflag</th>
                    <th>CDSL Remarks</th>
                    <th>Member Type</th>
                    <th>Member Name</th>
                    <th>Member Code</th>
                    <th>Client PAN</th>
                    <th>Statement Type</th>
                    <th>Statement Number</th>
                    <th>ISIN</th>
                    <th>Symbol</th>
                    <th>Client Code</th>
                    <th>Buy/Sell</th>
                    <th>Clearing Member Code</th>
                    <th>Clearing Member PAN</th>
                    <th>Market Type</th>
                    <th>Client Bo ID</th>
                    <th>Excel Flag</th>
                    <th>Created By</th>
                    <th>Created Date</th>
                    <th>Last Updated By</th>
                    <th>Last Updated Date</th>
                    <th>Previous Close Price</th>
                    <th>Mismatched Value</th>
                    <th>Same Day Free Balance</th>
                    <th>Next Day Free Balance</th>
                    <th>Free Balance</th>
                    <th>Trade Date</th>
                    <th>Next Trade Date</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.Bhavcopy}</td>
                      <td>{item.Date}</td>
                      <td>{item.ObligationQuantity}</td>
                      <td>{item.TotalQuantity}</td>
                      <td>{item.NSDLQuantity}</td>
                      <td>{item.NSDLProcessflag}</td>
                      <td>{item.NSDLRemarks}</td>
                      <td>{item.CDSLQuantity}</td>
                      <td>{item.CDSLProcessflag}</td>
                      <td>{item.CDSLRemarks}</td>
                      <td>{item.MemberType}</td>
                      <td>{item.MemberName}</td>
                      <td>{item.MemberCode}</td>
                      <td>{item.ClientPAN}</td>
                      <td>{item.StatementType}</td>
                      <td>{item.StatementNumber}</td>
                      <td>{item.ISIN}</td>
                      <td>{item.Symbol}</td>
                      <td>{item.ClientCode}</td>
                      <td>{item.BuySellFlag}</td>
                      <td>{item.ClearingMemberCode}</td>
                      <td>{item.ClearingMemberPAN}</td>
                      <td>{item.MarketType}</td>
                      <td>{item.ClientBoID}</td>
                      <td>{item.ExcelFlag}</td>
                      <td>{item.CreatedBy}</td>
                      <td>{item.CreatedDate}</td>
                      <td>{item.LastUpdatedBy}</td>
                      <td>{item.LastUpdatedDate}</td>
                      <td>{item.PreviousClosePrice}</td>
                      <td>{item.MismatchedValue}</td>
                      <td>{item.SameDayFreeBalance}</td>
                      <td>{item.NextDayFreeBalance}</td>
                      <td>{item.FreeBalance}</td>
                      <td>{item.TDate}</td>
                      <td>{item.NextTDate}</td>
                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Alerts