import React from 'react';
import '../../App.css';
import Logo from '../../components/logo_white.png'
import {
  UncontrolledDropdown,
  Toast,
  ToastBody,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  NavItem,
  Nav,
  NavLink,
  NavbarBrand
} from 'reactstrap';
import axios from 'axios';
class Navigation extends React.Component {

  constructor() {
    super()
    this.state = {
      'query_type': "indi", // indi by default, or broker, or company, change navbar as appropriate
      'search_term': "", // should take on value on input
      'query_tab': "client_profile", // value taken on by navbar
      'response_data': "", // take in response from flask server, should be json records
      isOpen: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state)
    axios.post("http://127.0.0.1:5000/", this.state,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => this.setState({ 'response_data': res.data }))
      .then(res => console.log(this.state.response_data))
      .catch(error => console.log(error))
  }

  render() {
    return (

      <div className="App">
        <div className="navbar">
          <Nav tabs >
            {/* <NavbarBrand href="/">NSE Profiling</NavbarBrand> */}

            <NavItem>
              <UncontrolledDropdown nav tabs inNavbar >
                <DropdownToggle caret >
                  {this.state.query_type === "indi" ? <code className="code">Client</code>
                    : (this.state.query_type === "broker" ? <code className="code">Brokerage</code>
                      : <code className="code">Company</code>)
                  }
                </DropdownToggle>
                <DropdownMenu left >
                  <DropdownItem onClick={(e) => this.setState({ query_type: "indi" })}>
                    Client
                </DropdownItem>
                  <DropdownItem onClick={(e) => this.setState({ query_type: "broker" })}>
                    Brokerage
                </DropdownItem>
                <DropdownItem onClick={(e) => this.setState({ query_type: "company" })}>
                    Company
                </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
          {this.state.query_type == "indi" ?
            (<Nav tabs>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "client_profile" })}>
                  Client Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "trade_data" })}>
                  Trade Data
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "blacklist" })}>
                  Blacklisted PAN
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "alerts" })}>
                  Alerts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "balances" })}>
                  Balances
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "monthly_balances" })}>
                  Monthly Balances
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={(e) => this.setState({ query_tab: "m2m" })}>
                  M2M Loss
                </NavLink>
              </NavItem>
            </Nav>)
            : (this.state.query_type == "company" ?
              (<Nav tabs>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "company_profile" })}>
                    Company Profile
                  </NavLink>
                </NavItem>
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
              : (<Nav tabs>
                <NavItem>
                  <NavLink onClick={(e) => this.setState({ query_tab: "broker_profile" })}>
                    Brokerage Profile
                  </NavLink>
                </NavItem>
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
            )
          }
          <div className="searchform">
            <Toast >
              <ToastBody>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                  <input type="text" name="search_term" value={this.state.search_term} placeholder="Search by Name" onChange={this.handleChange} className="finput" />
                  <button className="fbutton">Submit</button>
                </form>
              </ToastBody>
            </Toast>
          </div>

        </div>
      </div>

    );
  }
}



// render navbars as different classes within this file
// add this.handleClick to each of them


export default Navigation;
