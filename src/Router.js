import Header from "./components/header";
import Register from "./components/register";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import Footer from "./components/footer";
import Verification from "./components/verification";
import Login from "./components/login";
import Dob from "./components/DOB";
import ForgetUserName from "./components/forgetUserName/recovery";
import ForgetPassword from "./components/forgePassword/recovery";
import Welcome from "./components/welcome";
import { Route, Switch, Redirect } from "react-router-dom";

const Router = () => {
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
};

export default Router;
