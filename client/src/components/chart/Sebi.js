import React from 'react'
import { Alert, Toast, ToastHeader, ToastBody, PaginationItem, Pagination, PaginationLink, Table } from 'reactstrap';


class Sebi extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="sebi-container">
        <Toast id="alerts-toast">
          <ToastHeader>
            <p className="alerts-title">
              SEBI Alerts
            </p>
            <div className="pagination">
            </div>
          </ToastHeader>
          <Table className="alerts-table">
            <thead>
              <tr>
                <th></th>
                <th>Details</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Uniform KYC</td>
                <td>03-01-2020</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>AML/CFT Circulars</td>
                <td>03-03-2020</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Surrender of Membership</td>
                <td>12-03-2020</td>
              </tr>
            </tbody>
          </Table>
        </Toast>

      </div>
    )
  }
}

export default Sebi