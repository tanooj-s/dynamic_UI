import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../../components/person.jpg'


function AP(props) {
  return (
    <div className="AP">
      <h5>Authorized Personnel</h5>
      <Table hover>
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Designation</th>
            <th>Phone</th>
            <th>PAN</th>
            <th>Address</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) =>
            (<tr>
              <td>{item.Name}</td>
              <td>{item.Designation}</td>
              <td>{item.Phone}</td>
              <td>{item.PAN}</td>
              <td>{item.Address}</td>
              <td>{item.Email}</td>
            </tr>)
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default AP;
