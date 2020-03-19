import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, selectFilter, numberFilter,Comparator  } from 'react-bootstrap-table2-filter';

function Trades(props) {

    const columns = [{
              dataField: 'Date',
              text: 'Date',
              sort: true
            },{
              dataField: 'TradingMember',
              text: 'Trading Member',
              sort: true
            },{
              dataField: 'ClientCode',
              text: 'Client Code',
              sort: true
            },{
              dataField: 'OwnsSymbol',
              text: 'Symbol',
              sort: true,
              filter: textFilter({ caseSensitive: false }),
            },{
              dataField: 'ISIN',
              text: 'ISIN',
              sort: true
            },{
              dataField: 'Volume',
              text: 'Volume',
              sort: true,
              filter: numberFilter({ defaultValue: { number: 0, comparator: Comparator.GT } })
            },{
              dataField: 'BuyPrice',
              text: 'Buy Price',
              sort: true,
              filter: numberFilter({ defaultValue: { number: 10000, comparator: Comparator.GT } })
            },{
              dataField: 'SellPrice',
              text: 'Sell Price',
              sort: true,
              filter: numberFilter({ defaultValue: { number: 10000, comparator: Comparator.GT } })
            }]

    return (
        <div className="Events">
          <h4>{props.client_name}</h4>
          <h4>Trade Data</h4>
            {/*<Table hover>
                            <thead className="table-header">
                              <tr>
                                <th>Date</th>
                                <th>Trading Member</th>
                                <th>Client Code</th>
                                <th>Symbol</th>
                                <th>ISIN</th>
                                <th>Share Volume</th>
                                <th>Sell Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {props.data.map((item) =>
                                (<tr>
                                  <td>{item.Date}</td>
                                  <td>{item.TradingMember}</td>
                                  <td>{item.ClientCode}</td>
                                  <td>{item.OwnsSymbol}</td>
                                  <td>{item.ISIN}</td>
                                  <td>{item.Volume}</td>
                                  <td>{item.BuyPrice}</td>
                                  <td>{item.SellPrice}</td>

                                </tr>)
                              )}
                              </tbody>
                        </Table> */}
            <BootstrapTable keyField={'Date'}  data={props.data} columns={columns} filter={filterFactory()}   id="table-class" headerClasses="header-class" rowClasses={ "row-class" } />
        </div>
    )
}

export default Trades