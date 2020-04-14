import React from 'react';
import '../../m2m.css';
import '../../App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter, Comparator, dateFilter  } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';


class M2M extends React.Component {  
  render() {
    // const customTotal = (from, to, size) => (
    //   <span className="react-bootstrap-table-pagination-total">
    //     Showing { from} to { to} of { size} Results
    //   </span>
    // );
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
      // showTotal: true,
      // paginationTotalRenderer: customTotal,
      disablePageTitle: true,
      sizePerPageList: [{
        text: '10', value: 10
      }, {
        text: 'All', value: this.props.data.length
      }],
      // A numeric array is also available. the purpose of above example is custom the text
      
    };


    const columns = [
      {
        dataField: 'MemberName',
        text: 'Client Name',
        filter: textFilter({ caseSensitive: false }),
        // sort: true
      },
      {
        dataField: 'MemberPan',
        text: 'Client PAN',
        // sort: true
      },
      {
        dataField: 'TM',
        text: 'Member Name',
        // sort: true
      },
      {
        dataField: 'Date',
        text: 'Date',
        filter: dateFilter(),
        sort: true
      },
      {
        dataField: 'M2MLoss',
        text: 'M2M Loss (lakhs)',
        sort: true,
        filter: numberFilter({ defaultValue: { number: 650, comparator: Comparator.GT } })
      }]

    return (
      <div className="Events" >
        {/* <h4 className="m2m-title">{props.client_name}</h4> */}
        <h4 className="table-header-common" > M2M Loss For March 2020
        </h4>
        {/* <Table hover>
          <thead className="table-header">
            <tr>
              <th>Client Name</th>
              <th>Client PAN</th>
              <th>Member Name</th>
              <th>Date</th>
              <th>M2M Loss(lakhs)</th>  

            </tr>
          </thead>
        
        </Table> */}
        <BootstrapTable keyField={'id'}  data={this.props.data} columns={columns} filter={filterFactory()} id="table-class" headerClasses="header-class" rowClasses={"row-class"}  pagination={paginationFactory(options)} />
      </div >
    )
  }
}
export default M2M