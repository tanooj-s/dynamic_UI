import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';
import { driver } from "./neo4j";
import { FETCH_CATEGORIES_QUERY } from "./queries.js";
import paginationFactory from 'react-bootstrap-table2-paginator';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            client: []
        }
        this.fetchUserInfo = this.fetchUserInfo.bind(this)
    }
    componentWillMount() {
        this.fetchUserInfo()
    }


    fetchUserInfo() {
        console.log("CALLING FETCH USER");
        // console.log(this.props.selectedUser);
        const session = driver.session();
        session
            .run(FETCH_CATEGORIES_QUERY,
                { userName: this.props.client_name })
            .then(result => {
                console.log(result);
                const record = result.records[0];
                const client = record.get("client");
                this.setState({
                    client
                }, () => { console.log(this.state) });
            })
            .catch(e => {
                console.log(e);
            })
            .finally(() => {
                session.close();
            });
    };

    render() {
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
                text: 'All', value: this.state.client.length
            }],
            // A numeric array is also available. the purpose of above example is custom the text

        };
        const columns = [{
            dataField: 'cliname',
            text: 'Name',
            sort: true
        }, {
            dataField: 'bro',
            text: 'Trading Member',
            sort: true
        }, {
            dataField: 'pan',
            text: 'PAN',
            sort: true
        },
        {
            dataField: 'desig',
            text: 'Symbol',
            sort: true,
            filter: textFilter({ caseSensitive: false }),
        }, {
            dataField: 'tra',
            text: 'Type',
            sort: true
        }, {
            dataField: 'vol',
            text: 'Volume',
            sort: true,
            filter: numberFilter({ defaultValue: { number: 0, comparator: Comparator.GT } })
        }, {
            dataField: 'sp',
            text: 'Buy/Sell Price',
            sort: true,
            // filter: numberFilter({ defaultValue: { number: 10000, comparator: Comparator.GT } })
        }]

        return (
            <div className="Events">
                {/* <h4 className="table-header-common">Trade Data for {props.client_name}</h4> */}

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
                {console.log(this.props.client_name)}
                <BootstrapTable keyField={'id'} data={this.state.client} columns={columns} filter={filterFactory()} id="table-class" headerClasses="header-class" rowClasses={"row-class"} pagination={paginationFactory(options)} />
            </div>
        )
    }

}

export default UserProfile