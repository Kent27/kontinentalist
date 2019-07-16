import React from "react"
import { connect } from "react-redux";
import {Route, Redirect} from "react-router"

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>{
        return localStorage.getItem('tokenKontinentalist') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  );

const mapStateToProps = (state) => ({ user: state.login.user})

export default connect(mapStateToProps)(PrivateRoute)