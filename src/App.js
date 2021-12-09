import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
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

function App(props) {
  const history = useHistory();
  const storage = getStorage();
  

  const pathChecker = () => {
    const pathname = window.location.pathname;
    const is_valid_pathname =
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/forgetUser" ||
      pathname === "/forgetPass";
    const user_obj = props.userReducer;

    if (!user_obj.isvalid || is_valid_pathname) {
      removeStorage();
    }

    if (is_valid_pathname) return;

    if (!storage || !user_obj.isvalid) {
      history.push({
        pathname: "/register",
      });
    } else {
      history.push({
        pathname: `${storage}`,
      });
    }
  };

  pathChecker();
  return (
    <>
      <div className="app m-8">
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/info" render={() => <ClientInformations />} />
          <Route exact path="/recovery" render={() => <Recovery />} />
          <Route exact path="/verification" render={() => <Verification />} />
          <Route exact path="/dob" render={() => <Dob />} />
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
