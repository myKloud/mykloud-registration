import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { React, useEffect } from "react";
import Header from "./components/header";
import Register from "./components/register";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import Footer from "./components/footer";
import Verification from "./components/codeVerification";
import Login from "./components/login";
import Dob from "./components/DOB/";
import ForgetUserName from "./components/forgetUserName/recovery";
import ForgetPassword from "./components/forgePassword/recovery";
import { Route, Switch, Redirect } from "react-router-dom";
import { getStorage, removeStorage } from "../src/config/storage";
import Welcome from "./components/welcome";
import pathChecker from "./pathChecker.js";

function App(props) {
  const HISTORY = useHistory();
  const STORAGE = getStorage();
  const LOCATION = useLocation();
  const USER_OBJ = props.userReducer;

  useEffect(() => {
    window.addEventListener("popstate", () => {
      HISTORY.go(1);
    });
  }, []);

  useEffect(() => {
    pathChecker(USER_OBJ, HISTORY, STORAGE, removeStorage);
  }, [LOCATION.pathname === "/dob" || LOCATION.pathname === "/welcome"]);

  return (
    <>
      <Header />
      <div className="app m-8">
        <Switch>
          <Route exact path="/">
            <Redirect to="/register" />
          </Route>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/info" render={() => <ClientInformations />} />
          <Route exact path="/recovery" render={() => <Recovery />} />
          <Route exact path="/verification" render={() => <Verification />} />
          <Route exact path="/dob" render={() => <Dob />} />
          <Route exact path="/welcome" render={() => <Welcome />} />
          <Route exact path="/forgetUser" render={() => <ForgetUserName />} />
          <Route exact path="/forgetPass" render={() => <ForgetPassword />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = ({ userReducer }) => ({
  userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
