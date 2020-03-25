import React from 'react'
import {Toast, ToastHeader} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';



function SebiAlerts(props) {

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 2,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    // sizePerPageList: [{
    //   text: '2', value: 2
    // }, {
    //   text: '10', value: 10
    // }, {
    //   text: 'All', value: props.data.length
    // }] // A numeric array is also available. the purpose of above example is custom the text
  };

  const columns = [
    {
      dataField: 'Details',
      text: 'Details',
    },
    {
      dataField: 'Date',
      text: 'Date',
      // filter: textFilter({ caseSensitive: false }),
      sort: true
    },
  ]
  return (
    <div className="sebi-container">
      <Toast id="alerts-toast">
        <ToastHeader>
          SEBI Alerts

        </ToastHeader>
        <BootstrapTable keyField={'id'} data={props.data} columns={columns} filter={filterFactory()} pagination={paginationFactory(options)} />



      </Toast>

    </div>
  )
}


export default SebiAlerts