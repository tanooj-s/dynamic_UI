import React from 'react';
import companylogo from './components/logo_white.png'
import Events from './components/company/events'
import Complaints from './components/company/complaints'
import BoardMeetings from './components/company/board_meetings'

import AP from './components/broker/authorized_person'

import ClientProfile from './components/client/client_profile'
import Securities from './components/client/securities'
import Holdings from './components/client/holdings'
import Trades from './components/client/trades'
import Alerts from './components/client/alerts'
import M2M from './components/client/m2m'

import PieChart from './components/chart/piechart'
// import Chart from './components/chart/chart'
// import HorizontalBarChart from './components/chart/horizontal-barchart'

import KMP from './components/kmp'
// import PopotoGraph from './components/popoto-graph'
import D3Graph from './components/d3-graph.js'

import SebiAlerts from './components/chart/sebialerts';
import TradeDiscrepancy from './components/chart/tradediscrepancy'


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
// import Highcharts from 'highcharts';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      query_type: "", // indi by default, or broker, or company, change navbar as appropriate
      search_term: "", // should take on value on input
      query_tab: "", // value taken on by navbar
      response_data: "", // take in response from flask server, should be json records
      tab_display: 0,
      graph_display: 0,
      // only render navbar for display options if this is true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getResponse = this.getResponse.bind(this)
    this.cleanStringandJsonify = this.cleanStringandJsonify.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    //this.setState({ submitted: true })
    this.setState({ response_data: "" })
    console.log("REQUEST")
    console.log(this.state)
    this.getResponse("http://127.0.0.1:5000/", this.state)
    if (this.state.query_type === 'company') {
      this.setState({ query_tab: 'company_profile' })
    }
    else if (this.state.query_type === 'broker') {
      this.setState({ query_tab: 'broker_profile' })
    }
    else if (this.state.query_type === 'indi') {
      this.setState({ query_tab: 'indi_profile' })
    }
    this.setState({ tab_display: this.state.tab_display + 1 })

  }


  async getResponse(url, data) {
    let out_data = [] // try to set this as a string instead
    let decoder = new TextDecoder()
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(data),
    })
      .then(response => response.body.getReader().read()) // response comes in as ReadableStream() from fetch, attach reader object and read
      .then(({ done, value }) => {                        // which yields done (boolean) and individual values as uint8
        out_data.push(decoder.decode(value)) // push decoded uint8 values to outdata
      })
      .then(() => this.setState({ response_data: JSON.parse(out_data[0]) })) // instead of pushing to uint8, maybe do something like out_data = ''.join()
      .catch(error => alert("Error parsing JSON due to size of data - refresh and try searching again after 10 seconds!"))
    console.log("RESPONSE")
    console.log(this.state.response_data)
  }


  cleanStringandJsonify(s) {
    s.replace('\\', '')          // remove backslashes
    var stringed = JSON.parse(s) // first JSON parse returns a string
    return JSON.parse(stringed) // second returns array of JS objects
  }


  render() {
    return (
      <div className="App">


        <div className="navbar" id="navbar" sticky="top">
          <div className="logo">
            <a href={''} ><img src={companylogo}  className="small-logo" /></a>
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
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" >
              <input type="text" name="search_term" value={this.state.search_term} placeholder="  Search by Name" onChange={this.handleChange} className="finput" />
              <button className="fbutton">Search</button>
            </form>
          </div>
          {this.state.tab_display >0?
          <div className="vl" ></div>:<div></div>
          }
          {this.state.tab_display === 0 ? (<Nav></Nav>)
            : (this.state.query_type === "indi" ?
              (<Nav tabs >
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_dashboard", graph_display: 0 })}>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_trades", graph_display: 0 })}>
                    Trade Data
                  </NavLink>
                </NavItem>
                <NavItem>
                  {/* <NavLink onClick={(e) => this.setState({ query_tab: "indi_graph" })}> */}
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_graph", graph_display: 1 })} id="relationgraph">
                    Relationship Graph
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_alerts", graph_display: 0 })}>
                    NCL Alerts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_holdings", graph_display: 0 })}>
                    Holdings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_securities", graph_display: 0 })}>
                    Securities
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "indi_m2m", graph_display: 0 })}>
                    M2M Loss
                  </NavLink>
                </NavItem>
              </Nav>)
              : (this.state.query_type === "company" ?
                (<Nav tabs >
                  <NavItem>
                    <NavLink onClick={(e) => this.setState({ query_tab: "company_shareholding" })}>
                      Shareholding Pattern
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={(e) => this.setState({ query_tab: "company_board" })}>
                      Board Meetings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={(e) => this.setState({ query_tab: "company_kmp" })}>
                      Key Management Personnel
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={(e) => this.setState({ query_tab: "company_events" })}>
                      Events/Alerts
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={(e) => this.setState({ query_tab: "company_complaints" })}>
                      Complaints
                    </NavLink>
                  </NavItem>
                </Nav>)
                : (this.state.query_type === "broker" ?
                  (<Nav tabs >
                    <NavItem>
                      <NavLink onClick={(e) => this.setState({ query_tab: "broker_kmp" })}>
                        Key Management Personnel
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={(e) => this.setState({ query_tab: "broker_authorized" })}>
                        Authorized Personnel
                      </NavLink>
                    </NavItem>
                  </Nav>)
                  : (<Nav tabs>
                  </Nav>)
                )
              )
            )
          }

        </div>
        <div className="App-container">
          <div className="output-container">
            {this.state.response_data !== "" ?
              ((() => {
                switch (this.state.query_tab) {
                  case 'broker_kmp':
                    return <KMP data={this.state.response_data.kmp} />
                  case 'broker_authorized':
                    return <AP data={this.state.response_data.authorized} />
                  case 'company_shareholding':
                    return <PieChart data={this.state.response_data.shareholding} company_name={this.state.response_data.profile[0].Name} />
                  case 'company_board':
                    return <BoardMeetings data={this.state.response_data.board_meetings} company_name={this.state.response_data.profile[0].Name} />
                  case 'company_kmp':
                    return <KMP data={this.state.response_data.kmp} company_name={this.state.response_data.profile[0].Name} />
                  case 'company_events':
                    return <Events data={this.state.response_data.events} company_name={this.state.response_data.profile[0].Name} />
                  case 'company_complaints':
                    return <Complaints data={this.state.response_data.complaints} company_name={this.state.response_data.profile[0].Name} />
                  case 'indi_trades':
                    return <Trades data={this.state.response_data.trades} client_name={this.state.response_data.profile[0].ClientName} />
                  case 'indi_alerts':
                    return <Alerts data={this.state.response_data.alerts} client_name={this.state.response_data.profile[0].ClientName} />
                  case 'indi_securities':
                    return <Securities data={this.state.response_data.securities} client_name={this.state.response_data.profile[0].ClientName} />
                  case 'indi_holdings':
                    return <Holdings data={this.state.response_data.holdings} client_name={this.state.response_data.profile[0].ClientName} />
                  case 'indi_m2m':
                    return <M2M data={this.state.response_data.all_m2m} client_name={this.state.response_data.profile[0].ClientName} />
                  case 'indi_graph':
                    return <D3Graph data={this.state.response_data} />
                  case 'indi_sebialerts':
                    return <SebiAlerts data={this.state.response_data.sebialerts} client_name={this.state.response_data.profile[0].ClientName} />
                  case'indi_tradedesc':
                    return <TradeDiscrepancy data={this.state.response_data.tradedesc} client_name={this.state.response_data.profile[0].ClientName} />
                    case 'indi_dashboard':
                    return <ClientProfile data={this.state.response_data} />;
                  default:
                    return <ClientProfile data={this.state.response_data} />;
                }
              })())
              : (<div></div>)
            }

          </div>
        </div>
      </div>

    );
  }
}


export default App;
