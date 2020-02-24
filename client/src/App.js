import React from 'react';
import logo from './logo.svg';
import CompanyProfile from './components/company/company_profile'
import Events from './components/company/events'
import Complaints from './components/company/complaints'
import BoardMeetings from './components/company/board_meetings'
import BProfile from './components/broker/broker_profile'
import KMP from './components/broker/kmp'
import AP from './components/broker/authorized_person'
import PieChart from './components/chart/piechart'
import Chart from './components/chart/chart'


import './App.css';
import { Form,
        Input,
        Button,
        Navbar,
        NavItem,
        Nav,
        NavLink,
        NavbarBrand,
        UncontrolledDropdown,
        Toast,
        ToastBody,
        DropdownToggle,
        DropdownItem,
        DropdownMenu,
        Table,
        Card
      } from 'reactstrap';
import Highcharts from 'highcharts';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      query_type: "", // indi by default, or broker, or company, change navbar as appropriate
      search_term: "", // should take on value on input
      query_tab: "", // value taken on by navbar
      response_data: "", // take in response from flask server, should be json records
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
    this.getResponse("http://127.0.0.1:5000/", this.state)
    console.log("REQUEST")
    console.log(this.state)
  }


  async getResponse (url, data) {
    let out_data = [] // try to set this as a string instead
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      body: JSON.stringify(data),
    })
    .then(response => response.body.getReader().read()) // response comes in as ReadableStream() from fetch, attach reader object and read
    .then(({ done, value }) => {                        // which yields done (boolean) and individual values as uint8
      out_data.push(new TextDecoder().decode(value)) // push uint8 values to outdata
    })
    this.setState({ response_data: JSON.parse(out_data[0]) }) // instead of pushing to uint8, maybe do something like out_data = ''.join()
    console.log("RESPONSE")
    console.log(this.state.response_data)
  }


  cleanStringandJsonify(s) {
    s.replace('\\','')          // remove backslashes
    var stringed = JSON.parse(s) // first JSON parse returns a string
    return JSON.parse(stringed) // second returns array of JS objects
  }


  render () {
    return (
      <div className="App">
        <div className="navbar">
            <Nav tabs >
            {/* <NavbarBrand href="/">NSE Profiling</NavbarBrand> */}

            <NavItem>
              <UncontrolledDropdown nav tabs inNavbar >
                <DropdownToggle caret >
                  {this.state.query_type === "indi" ? <code className="code">CLIENT</code>
                    : (this.state.query_type === "broker" ? <code className="code">BROKER</code>
                      : <code className="code">COMPANY</code>)
                  }
                </DropdownToggle>
                <DropdownMenu left >
                  <DropdownItem onClick={(e) => this.setState({ query_type: "indi", search_term: "", query_tab: "", response_data: "" })}>
                    CLIENT
                </DropdownItem>
                  <DropdownItem onClick={(e) => this.setState({ query_type: "broker", search_term: "", query_tab: "", response_data: "" })}>
                    BROKER
                </DropdownItem>
                <DropdownItem onClick={(e) => this.setState({ query_type: "company", search_term: "", query_tab: "", response_data: "" })}>
                    COMPANY
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>

          <div className="searchform">
            <Toast>
              <ToastBody>
                <form onSubmit = {this.handleSubmit} encType="multipart/form-data">
                  <input type="text" name="search_term" value={this.state.search_term} placeholder="Search by name" onChange = {this.handleChange} className="finput"/>
                  <button className="fbutton">Submit</button>
                </form>
              </ToastBody>
            </Toast>
          </div>

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
              :(this.state.query_type === "broker" ? 
                (<Nav tabs>
                    <NavItem>
                      <NavLink onClick = {(e) => this.setState({query_tab: "broker_profile"})}>
                        Broker Profile
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
                :(<Nav tabs>
                  </Nav>)
                )
              )
          }
          
        </div>
        <div className="App-container">
          <div className="output-container">
            {this.state.response_data !== "" ?
              ((() => {
                switch(this.state.query_tab) {
                  case 'broker_profile':
                    return <BProfile data={this.state.response_data.profile} />
                  case 'broker_kmp':
                    return <KMP data={this.state.response_data.kmp}/>
                  case 'broker_authorized':
                    return <AP data={this.state.response_data.authorized} />
                  case 'company_profile':
                    return <CompanyProfile data={this.state.response_data.profile} />
                  case 'company_shareholding':
                    return <PieChart data={this.state.response_data} company_name={this.state.response_data.profile[0].Name}/>
                  case 'company_board':
                    return <BoardMeetings data={this.state.response_data.board_meetings} company_name={this.state.response_data.profile[0].Name}/>
                  case 'company_kmp':
                    return <KMP data={this.state.response_data.kmp} company_name={this.state.response_data.profile[0].Name}/>
                  case 'company_events':
                    return <Events data={this.state.response_data.events} company_name={this.state.response_data.profile[0].Name}/>
                  case 'company_complaints':
                    return <Complaints data={this.state.response_data.complaints} company_name={this.state.response_data.profile[0].Name}/>
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
              })())
              :(<div></div>)
            }
          </div>
        </div>
      </div>
    );
  }
}


export default App;
