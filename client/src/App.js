import React from 'react';
import './App.css';
import Navigation from './components/navbar/navbar'
import axios from 'axios';
import CompanyProfile from './components/company/company_profile'
import KMP from './components/broker/kmp'
import AP from './components/broker/authorized_person'
import BProfile from './components/broker/broker_profile'
class App extends React.Component {

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
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (

      <div className="App">
        <Navigation/>
        <p>fcg</p>
        <div className="App-container">
          {/* <KMP/> */}
          {/* <AP/> */}
          {/* <BProfile/> */}
          
        </div>
      </div>

    );
  }
}



// render navbars as different classes within this file
// add this.handleClick to each of them


export default App;
