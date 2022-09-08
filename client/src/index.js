import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';


import Home from './components/Main';



import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';





ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path={'/'} component={Home}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
