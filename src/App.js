import Router from "./Router";
import pathChecker from "./pathChecker.js";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { React, useEffect } from "react";
import { getStorage, removeStorage } from "./config/storage";

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
