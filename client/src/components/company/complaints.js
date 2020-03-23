import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';



function Complaints(props) {
    return (
        <div className="KMP">
          <h5 className="table-header-common">Complaints</h5>
            <Table hover>
                <thead className="table-header">
                  <tr>
                    <th>Company</th>
                    <th>Name of Complainant</th>
                    <th>PAN</th>
                    <th>Bank</th>
                    <th>Complaint Link</th>
                    <th>Source</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.CompanyName}</td>
                      <td>{item.Name}</td>
                      <td>{item.PAN}</td>
                      <td>{item.BankDetails}</td>
                      <td>{item.ComplaintDetails}</td>
                      <td>{item.SourceDetails}</td>
                      <td>{item.Date}</td>
                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Complaints;
