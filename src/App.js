import Router from "./Router";
import pathChecker from "./pathChecker.js";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { React, useEffect } from "react";
import { getStorage, removeStorage } from "./shared/storage";

function App(props) {
  const history = useHistory();
  const storage = getStorage();
  const location = useLocation();
  const userObj = props.userReducer;

  useEffect(() => {
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  }, []);

  useEffect(() => {
    pathChecker(userObj, history, storage, removeStorage);
  }, [location.pathname === "/dob" || location.pathname === "/welcome"]);

  return (
    <>
      <Router />
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
