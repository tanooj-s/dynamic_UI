import React from 'react'
import './App.css'
class SearchForm extends React.Component {
  onSubmit = () => {
    this.props.history.push('/')
  }
  render() {
    return (
      <div className="start-search">
        <form className="search-form" >
          {/* <input placeholder="name" type="name" />
        <input placeholder="email" type="email" /> */}
          <div className="form-row">
            <div>

              <div className="col-auto">
                <label className="sr-only" for="inlineFormInput"></label>
                <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Name" />
              </div>
              <div className="col-auto">
                <label className="sr-only" for="inlineFormInputGroup">Last Name</label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                  </div>
                  <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="PAN" />
                </div>
              </div>
              <div className="col-auto">
                <label className="sr-only" for="inlineFormInput"></label>
                <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Phone number" />
              </div>
              <div className="col-auto">
                <label className="sr-only" for="inlineFormInputGroup"></label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                  </div>
                  <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="KMP of Company" />
                </div>
              </div>
            </div>

            <div >

              <div className="col-auto">
                <label className="sr-only" for="inlineFormInput"></label>
                <input type="text" className="form-control mb-2" id="inlineFormInput1" placeholder="Trading Member" />
              </div>
              <div className="col-auto">
                <label className="sr-only" for="inlineFormInputGroup"></label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                  </div>
                  <input type="text" className="form-control" id="inlineFormInputGroup"
                    placeholder="Trade Data" />
                </div>
              </div>
              <div className="col-auto">
                <label className="sr-only" for="inlineFormInput"></label>
                <input type="text" className="form-control mb-2" id="inlineFormInput1"
                  placeholder="M2M Loss" />
              </div>
            </div>
          </div>
        </form>
          <button onClick={this.onSubmit}>Submit</button>
      </div>
    )
  }
}
export default SearchForm