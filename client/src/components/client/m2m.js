import React from 'react';
import '../../m2m.css';
import '../../App.css';
import { Table } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, numberFilter,Comparator  } from 'react-bootstrap-table2-filter';


class M2M extends React.Component {



  constructor(props) {
    super(props)

  }


  render() {


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
        sort: true
      },
      {
        dataField: 'M2MLoss',
        text: 'M2M Loss',
        sort: true,
        filter: numberFilter({ defaultValue: { number: 650, comparator: Comparator.GT } })
      }]

    return (
      <div className="Events" >
        {/* <h4 className="m2m-title">{props.client_name}</h4> */}
        <div className="m2m-title" > M2M Loss For March 2020
        </div>
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
        <BootstrapTable keyField={'id'}  data={this.props.data} columns={columns} filter={filterFactory()}   id="table-class" headerClasses="header-class" rowClasses={ "row-class" } />
      </div >
    )
  }
}
export default M2M