import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "./Login";
import Dashboard from "./Dashboard";


class App extends Component {
  render () {
    return (
        <Router>
            <Switch>
                <PublicRoute path={`/login`} component={Login} />                   
                <PrivateRoute path={`/`} component={Dashboard} />
            </Switch>
        </Router>
    )
  }
}

export default App;
