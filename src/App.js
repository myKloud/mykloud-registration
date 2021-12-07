import { useHistory } from "react-router-dom";
import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import Footer from "./components/footer";
import Verification from "./components/codeVerification";
import Login from "./components/login";
import Dob from "./components/DOB/";
import ForgetUserName from "./components/forgetUserName";
import { Route, Switch } from "react-router-dom";
import { getStorage } from "../src/config/storage";

function App() {
  const history = useHistory();
  const storage = getStorage();

  if (storage === null) {
    history.push({
      pathname: "/register",
    });
  } else {
    history.push({
      pathname: `${storage}`,
    });
  }

  return (
    <>
      <div className="app m-8">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Login />} />
          <Route exact path="/register" render={() => <Register />} />
          <Route exact path="/info" render={() => <ClientInformations />} />
          <Route exact path="/recovery" render={() => <Recovery />} />
          <Route exact path="/verification" render={() => <Verification />} />
          <Route exact path="/dob" render={() => <Dob />} />
          <Route exact path="/forgetUser" render={() => <ForgetUserName />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
