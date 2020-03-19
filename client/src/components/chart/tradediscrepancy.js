import React from 'react'
import { Alert, Toast, ToastHeader, ToastBody, PaginationItem, Pagination, PaginationLink, Table } from 'reactstrap';


class TradeDiscrepancy extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="sebi-ncl-container">
        <Toast id="alerts-toast">
          <ToastHeader>
            <p className="alerts-title">
              Trade Discrepancy Report
            </p>

            {/* <div className="pagination">
            </div> */}
          </ToastHeader>


          <Table className="alerts-table" size="sm" borderless responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Scrip</th>
                <th>TM Volume</th>
                <th>CM Volume</th>
              </tr>
            </thead>
            <tbody>
              {this.props.data.map((item) =>
                (
                  <tr>
                    <td>{item.Date}</td>
                    <td>{item.scrip}</td>
                    <td>{item.TMVolume}</td>
                    <td>{item.CMVolume}</td>
                  </tr>))}

            </tbody>
          </Table>
        </Toast>

      </div>
    )
  }
}

export default TradeDiscrepancy