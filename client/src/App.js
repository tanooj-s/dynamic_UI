import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Input, Button, Navbar, NavItem, Nav, NavLink, Table, Card } from 'reactstrap';
import Highcharts from 'highcharts';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      query_type: "indi", // indi by default, or broker, or company, change navbar as appropriate
      search_term: "", // should take on value on input
      query_tab: "client_profile", // value taken on by navbar
      response_data: "" // take in response from flask server, should be json records
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
    this.getResponse("http://127.0.0.1:5000/", this.state)
    console.log(this.state)
  }

  async getResponse (url, data) {
    let out_data = [] // try to not make this an array
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(data),
    })
    .then(response => response.body.getReader().read())
    .then(({ done, value }) => {
      out_data.push(new TextDecoder().decode(value)) // value returned as uint8 arrays
    })
    this.setState({ response_data: this.cleanStringandJsonify(out_data[0]) })
    console.log(this.state)
  }


  cleanStringandJsonify(s) {
    s.replace('\\','')
    var stringed = JSON.parse(s) // return JSON object, remove backslashes
    return JSON.parse(stringed)
  }


  render () {
    return (
      <div className="App">
        <div className="navbar">
            <Nav tabs>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_type: "indi"})}>
                  Individual
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_type: "broker"})}>
                  Brokerage
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_type: "company"})}>
                  Company
                </NavLink>
              </NavItem>
            </Nav>

          {this.state.query_type === "indi" ?
            (<Nav tabs>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_profile"})}>
                  Client Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_trade_data"})}>
                  Trade Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_blacklist"})}>
                  Blacklisted PANs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_alerts"})}>
                  Alerts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_balances"})}>
                  Balances
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_monthly_balances"})}>
                  Monthly Balances
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick = {(e) => this.setState({query_tab: "indi_m2m"})}>
                  M2M Loss
                </NavLink>
              </NavItem>
            </Nav>)
            :(this.state.query_type === "company" ?
              (<Nav tabs>
                <NavItem>
                  <NavLink onClick = {(e) => this.setState({query_tab: "company_profile"})}>
                    Company Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick = {(e) => this.setState({query_tab: "company_shareholding"})}>
                    Shareholding Pattern
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick = {(e) => this.setState({query_tab: "company_board"})}>
                    Board Meetings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick = {(e) => this.setState({query_tab: "company_kmp"})}>
                    Key Management Personnel
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick = {(e) => this.setState({query_tab: "company_events"})}>
                    Events/Alerts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick = {(e) => this.setState({query_tab: "company_complaints"})}>
                    Complaints
                  </NavLink>
                </NavItem>
              </Nav>)
              :(<Nav tabs>
                  <NavItem>
                    <NavLink onClick = {(e) => this.setState({query_tab: "broker_profile"})}>
                      Brokerage Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick = {(e) => this.setState({query_tab: "broker_kmp"})}>
                      Key Management Personnel
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick = {(e) => this.setState({query_tab: "broker_authorized"})}>
                      Authorized Personnel
                    </NavLink>
                  </NavItem>
                </Nav>)
              )
          }
        </div>
        <div className="App-container">
          <form onSubmit = {this.handleSubmit} encType="multipart/form-data">
            <input type="text" name="search_term" value={this.state.search_term} placeholder="Search by name" onChange = {this.handleChange} />
            <button>Submit</button>
          </form>
          <div className="example-output">

          </div>
          <div className="output-container">
            {(() => {
              switch(this.state.query_tab) {
                case 'broker_profile':
                  return <Card data={this.state.response_data} />
                case 'broker_kmp':
                  return <Table data={this.state.response_data} />
                case 'broker_authorized':
                  return <Table data={this.state.response_data} />
                case 'company_profile':
                  return <Card data={this.state.response_data} />
                case 'company_shareholding':
                  return <Card data={this.state.response_data} />
                case 'company_board':
                  return <Table data={this.state.response_data} />
                case 'company_kmp':
                  return <Table data={this.state.response_data} />
                case 'company_events':
                  return <Card data={this.state.response_data} />
                case 'company_complaints':
                  return <Table data={this.state.response_data} />
                case 'indi_profile':
                  return <Card data={this.state.response_data} />
                case 'indi_trade_data':
                  return <Card data={this.state.response_data} />
                case 'indi_blacklist':
                  return <Table data={this.state.response_data} />
                case 'indi_alerts':
                  return <Table data={this.state.response_data} />
                case 'indi_balances':
                  return <Card data={this.state.response_data} />
                case 'indi_monthly_balances':
                  return <Card data={this.state.response_data} />
                case 'indi_m2m':
                  return <Card data={this.state.response_data} />
                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}


export default App;
