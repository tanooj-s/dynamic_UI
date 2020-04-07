import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import SearchForm from './search-form'
import SearchList from './search-list'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './404NotFound';
import D3Neo from './components/d3graph/d3neo';


const routing = (

    <Router>
      <div>
        <Route path="/" component={D3Neo} />
        <Route path="/search-form" component={SearchForm} />
        <Route path="/search-list" component={SearchList} />
        <Route path="/404NotFound" component={NotFound}/>
      </div>
    </Router>
  )

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
