import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import App from "./App";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Header from "./components/Header/Header";

function PrivateRoute({ children, isLogged, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
const Routes = ({ isLogged }) => {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <PrivateRoute exact path="/home" isLogged={isLogged}>
            <App></App>
          </PrivateRoute>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/sign-up">
            <Signup></Signup>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
const mapStateToProps = (state) => ({ isLogged: state.isLogged });
export default connect(mapStateToProps)(Routes);
