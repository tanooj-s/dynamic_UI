import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';



function Events(props) {
    return (
        <div className="Events">
          <h5 className="table-header-common">Events</h5>
            <Table hover>
                <thead className="table-header">
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
