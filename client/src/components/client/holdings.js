import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../../components/person.jpg'

function Holdings(props) {
    return (
        <div className="Events">
          <h4>Holdings</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Client Name</th>
                    <th>PAN</th>
                    <th>Member Demat No</th>
                    <th>UCC</th>
                    <th>Member Account Type</th>
                    <th>ISIN</th>
                    <th>Security</th>
                    <th>Pledged Balanced Quantity</th>
                    <th>Free Balance Quantity</th>
                    <th>Total Quantity</th>
                    <th>Action</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.ClientName}</td>
                      <td>{item.MemberPAN}</td>
                      <td>{item.MemberDematNo}</td>
                      <td>{item.UniqueClientCode}</td>
                      <td>{item.MemberAccountType}</td>
                      <td>{item.ISIN}</td>
                      <td>{item.SecurityType}</td>
                      <td>{item.PledgedBalanceQuantity}</td>
                      <td>{item.FreeBalanceQuantity}</td>
                      <td>{item.TotalQuantity}</td>
                      <td>{item.Action}</td>
                      <td>{item.Remarks}</td>
                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Holdings