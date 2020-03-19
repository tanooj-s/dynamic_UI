import React from 'react'
import { Alert, Toast, ToastHeader, ToastBody, PaginationItem, Pagination, PaginationLink, Table } from 'reactstrap';


function SebiAlerts(props) {
  return (
    <div className="sebi-container">
      <Toast id="alerts-toast">
        <ToastHeader>
          <p className="alerts-title">
            SEBI Alerts
            </p>
        </ToastHeader>
        <Table className="alerts-table" size="sm" borderless responsive>
          <thead>
            <tr>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item) =>
              (<tr>
                <td>{item.Details}</td>
                <td>{item.Date}</td>
              </tr>)
            )}

          </tbody>
        </Table>
      </Toast>

    </div>
  )
}


export default SebiAlerts