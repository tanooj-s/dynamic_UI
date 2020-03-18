import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';

const sortTypes = {
  up: {
    class: 'sort-up',
    fn: (a, b) => a.M2MLoss - b.M2MLoss
  },
  down: {
    class: 'sort-down',
    fn: (a, b) => b.M2MLoss - a.M2MLoss
  },
  default: {
    class: 'sort',
    fn: (a, b) => a
  }
}



class M2M extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentSort: "default"
    }
  }
  onSortChange = () => {
    const { currentSort } = this.state;
    let nextSort;

    if (currentSort === 'down') nextSort = 'up';
    else if (currentSort === 'up') nextSort = 'default';
    else if (currentSort === 'default') nextSort = 'down';

    this.setState({
      currentSort: nextSort
    })
  }


  render() {
    const { data } = this.props;
    const { currentSort } = this.state;

    return (
      <div className="Events" >
        {/* <h4 className="m2m-title">{props.client_name}</h4> */}
        <h4 className="m2m-title" > M2M Loss For March 2020
        <button onClick={this.onSortChange} className="m2m-sort">
          <i className={`fas fa-${sortTypes[currentSort].className}`}></i> Sort
        </button>
        </h4>
        <Table hover>
          <thead className="table-header">
            <tr>
              <th>Client Name</th>
              <th>Client PAN</th>
              <th>Member Name</th>
              <th>Date</th>
              <th>M2M Loss(lakhs)</th>

            </tr>
          </thead>
          <tbody>
            {[...data].sort(sortTypes[currentSort].fn).map((item) =>
              (<tr>
                <td>{item.MemberName}</td>
                <td>{item.MemberPan}</td>
                <td>{item.TM}</td>
                <td>{item.Date}</td>
                <td>{item.M2MLoss}</td>
              </tr>)
            )}
          </tbody>
        </Table>
      </div >
    )
  }
}
export default M2M