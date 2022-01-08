import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components of Web App
import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login'; 
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute'

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utilities/setAuthToken';

import './App.css';

const App = () => { 
  useEffect(()=> {
    store.dispatch(loadUser());
  },{});

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path = '/' component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path = "/register" component={Register}/>
            <Route exact path = "/login" component={Login}/>
            <PrivateRoute exact path = "/dashboard" component={Dashboard}/>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
) };

export default App;
