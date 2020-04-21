import React from 'react';
import companylogo from './components/logo_white.png'
import './App.css';
import {
  NavItem,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

class App2 extends React.Component {
  constructor() {
    super()
    this.state = {
      search_term: "",
      query: "",
      query_type: "indi",
      search_results: "",
      response_data: "",
      search_results_page: 0, // 0 - no search, 1 - search results as list, 2 - user clicked on particular client/brokerage/company
      page_display: "search" // search/indi/company/brokerage
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.getNeo4jResponse = this.getNeo4jResponse.bind(this)
    this.neo4j = require('neo4j-driver')
    this.driver = this.neo4j.driver('bolt://localhost:7687', this.neo4j.auth.basic('neo4j','12345'))
    this.session = this.driver.session()
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSearchSubmit(event) {
    // needs to take into account intermediate search results page
    event.preventDefault()
    let search_result_data = []
    let search_query = ""
    if (this.state.query_type === "indi") {
      search_query = `MATCH (n:Client) WHERE n.name CONTAINS '${this.state.search_term}' RETURN n`
    } else if (this.state.query_type === 'broker') {
      search_query = `MATCH (n:Brokerage) WHERE n.name CONTAINS '${this.state.search_term}' RETURN n`
    } else if (this.state.query_type === 'company') {
      search_query = `MATCH (n:Company) WHERE n.name CONTAINS '${this.state.search_term}' RETURN n`
    }
    this.session.run(search_query)
    .then(result => {
      result.records.forEach(record => {
        search_result_data.push(record.get('n'))
      })
    })
    .catch(error => alert(error))
    .then(() => this.setState({ search_results: search_result_data }))
    .then(() => this.setState({ search_results_page: 1 }))
  }

  async getNeo4jResponse (state_data) {

  }

  render () {
    return (
      <div className="App">
        <div className="navbar" id="navbar" sticky="top">
          <div className="logo">
            <a href={''} ><img src={companylogo} className="small-logo" /></a>
          </div>

          <Nav tabs>
            {/* <NavbarBrand href="/">NSE Profiling</NavbarBrand> */}
            <NavItem className="searchitem">
              <UncontrolledDropdown >
                <DropdownToggle caret>
                  {this.state.query_type === "indi" ? <code className="code">CLIENT</code>
                    : (this.state.query_type === "broker" ? <code className="code">BROKER</code>
                      : (this.state.query_type === "company" ? <code className="code">COMPANY</code>
                        : <code className="code">SELECT</code>
                      )
                    )
                  }
                </DropdownToggle>
                <DropdownMenu left="true" >
                  <DropdownItem onClick={(e) => this.setState({ query_type: "indi", search_term: "", query_tab: "", response_data: "", tab_display: 0 })}>
                    CLIENT
                  </DropdownItem>
                  <DropdownItem onClick={(e) => this.setState({ query_type: "broker", search_term: "", query_tab: "", response_data: "", tab_display: 0 })}>
                    BROKER
                  </DropdownItem>
                  <DropdownItem onClick={(e) => this.setState({ query_type: "company", search_term: "", query_tab: "", response_data: "", tab_display: 0 })}>
                    COMPANY
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
          <div className="searchform">
            <form onSubmit={this.handleSearchSubmit} encType="multipart/form-data" >
              <input type="text" name="search_term" value={this.state.search_term} placeholder=" &nbsp;Search by Name" onChange={this.handleChange} className="finput" />
              <button className="fbutton" >Search</button>
            </form>
          </div>

        </div>
        <div className="App-container">
          <div className="output-container">
              {this.state.search_results_page === 0 ? (<div></div>)
                : (this.state.search_results_page === 1 ? (
                    this.state.search_results.map(result => (<li>{result.properties.name}</li>))
                  ) : (<div><p>This will be the dashboard</p></div>) // should have a dashboard component here with query type and response data as a prop
                )
              }
          </div>
        </div>
      </div>

    )
  }
}

export default App2