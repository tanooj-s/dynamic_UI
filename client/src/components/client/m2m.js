import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../../components/person.jpg'

function M2M(props) {
    return (
        <div className="Events">
          <h4>M2M</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Date</th>
                    <th>Member ID</th>
                    <th>TMCD</th>
                    <th>Member Name</th>
                    <th>Client Value</th>
                    <th>Product Value</th>
                    <th>Net Buy</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.Date}</td>
                      <td>{item.MemberID}</td>
                      <td>{item.TMCD}</td>
                      <td>{item.MemberName}</td>
                      <td>{item.ClientValue}</td>
                      <td>{item.ProductValue}</td>
                      <td>{item.NetBuy}</td>
                      <td>{item.Rank}</td>

                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default M2M