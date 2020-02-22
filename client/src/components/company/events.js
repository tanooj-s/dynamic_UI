import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../../components/person.jpg'



function Events(props) {
    return (
        <div className="Events">
            <Table hover>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {props.data.map((item) =>
                    (<tr>
                      <td>{item.Event}</td>
                      <td>{item.Description}</td>
                      <td>{item.Date}</td>
                    </tr>)
                  )}
                  </tbody>
            </Table>
        </div>
    )
}

export default Events;
