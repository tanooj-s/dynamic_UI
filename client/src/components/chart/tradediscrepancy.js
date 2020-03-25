import React from 'react'
import {  Toast, ToastHeader } from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


class TradeDiscrepancy extends React.Component {

  render() {

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        Showing { from} to { to} of { size} Results
      </span>
    );
    const options = {
      paginationSize: 4,
      // pageStartIndex: 1,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      hideSizePerPage: true, // Hide the sizePerPage dropdown always
      hidePageListOnlyOnePage: true, // Hide the pagination list when only one page 
      firstPageText: '<<',
      prePageText: '<',
      nextPageText: '>',
      lastPageText: '>>',
      // nextPageTitle: 'First page',
      // prePageTitle: 'Pre page',
      // firstPageTitle: 'Next page',
      // lastPageTitle: 'Last page',
      showTotal: true,
      paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [{
        text: '2', value: 2
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.data.length
      }] // A numeric array is also available. the purpose of above example is custom the text
    };
    const columns = [
      {
        dataField: 'Date',
        text: 'Date',
        // filter: textFilter({ caseSensitive: false }),
        sort: true
      },
      {
        dataField: 'scrip',
        text: 'Scrip',
      },
      {
        dataField: 'TMVolume',
        text: 'TM Volume',
      },
      {
        dataField: 'CMVolume',
        text: 'CM Volume',
      }]
    return (
      <div className="sebi-ncl-container">
        <Toast id="alerts-toast">
          <ToastHeader>
            Trade Discrepancy Report
          </ToastHeader>

          <BootstrapTable keyField={'id'} data={this.props.data} columns={columns} filter={filterFactory()} pagination={paginationFactory(options)} />

        </Toast>

      </div>
    )
  }
}

export default TradeDiscrepancy