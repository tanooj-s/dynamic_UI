import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../person.jpg'

function BoardMeetings(props) {
    return (
        <div className="KMP">
          <h5 className="table-header-common">Board Meetings</h5>
          <Table hover>
              <thead className="table-header">
                <tr>
                  <th>Company</th>
                  <th>Purpose</th>
                  <th>Meeting Date</th>
                  <th>Broadcast Date</th>
                </tr>
              </thead>
              <tbody>
                {props.data.map((item) =>
                  (<tr>
                    <td>{item.CompanyName}</td>
                    <td>{item.Purpose}</td>
                    <td>{item.MeetingDate}</td>
                    <td>{item.BroadcastDate}</td>
                  </tr>)
                )}
                </tbody>
          </Table>
      </div>
    )
}

export default BoardMeetings;
