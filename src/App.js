import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import Footer from "./components/footer";
import Verification from "./components/codeVerification";
import Login from "./components/login";
import { Route, Switch } from "react-router-dom";

function App() {
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
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
