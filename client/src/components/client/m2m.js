import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';

function M2M(props) {
    return (
        <div className="Events">
          <h4 className="m2m-title">{props.client_name}</h4>
          <h4 className="m2m-title">M2M</h4>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Client Name</th>
                    <th>Client PAN</th>
                    <th>Member Name</th>
                    <th>Date</th>
                    <th>M2M Loss(lacs)</th>
                    <th>Net Buy</th>
                    <th>Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.MemberName}</td>
                      <td>{item.MemberPan}</td>
                      <td>{item.TM}</td>
                      <td>{item.Date}</td>
                      <td>{item.M2MLoss}</td>
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