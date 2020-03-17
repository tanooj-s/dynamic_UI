import React from 'react'
import { Alert, Toast, ToastHeader, ToastBody, PaginationItem, Pagination, PaginationLink, Table } from 'reactstrap';


class SebiNCL extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="sebincl-container">
        <Toast id="alerts-toast">
          <ToastHeader>
            <p className="alerts-title">
              NCL Alerts
            </p>
            <div className="pagination">
            </div>
          </ToastHeader>
          <Table className="alerts-table">
            <thead>
              <tr>
                <th></th>
                <th>Terms</th>
                <th>Dates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Change of Company Name</td>
                <td>25-03-2020</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Declaration as Defaulter</td>
                <td>04-03-2020</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Stock Monthly Settlement</td>
                <td>12-03-2020</td>
              </tr>
            </tbody>
          </Table>
        </Toast>

      </div>
    )
  }
}

export default SebiNCL