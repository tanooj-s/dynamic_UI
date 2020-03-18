import React from 'react'
import { Alert, Toast, ToastHeader, ToastBody, PaginationItem, Pagination, PaginationLink, Table } from 'reactstrap';


class NclAlerts extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="ncl-container">
        <Toast id="alerts-toast">
          <ToastHeader>
            <p className="alerts-title">
              NCL Alerts
            </p>

            <div className="pagination">

              <Pagination aria-label="Page navigation example" size="sm">
                <PaginationItem>
                  <PaginationLink previous href="#" id="pag-link" />
                </PaginationItem>
                <p className="page-range">1-5</p>

                <PaginationItem>
                  <PaginationLink next href="#" id="pag-link" />
                </PaginationItem>

              </Pagination>
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
                <td>Same Date Free Balance:</td>
                <td>{this.props.data[0].SameDayFreeBalance}</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Next Date Free Bal:</td>
                <td>{this.props.data[0].NextDayFreeBalance}</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Mismatch Value:</td>
                <td>{this.props.data[0].MismatchedValue}</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>  Clearing Member ID:</td>
                <td>{this.props.data[0].ClearingMemberCode}</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>CDSL remarks:</td>
                <td>{this.props.data[0].CDSLRemarks}</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>NSDL remarks:</td>
                <td>{this.props.data[0].NSDLRemarks}</td>
              </tr>
            </tbody>
          </Table>
        </Toast>

      </div>
     
    )
  }
}

export default NclAlerts