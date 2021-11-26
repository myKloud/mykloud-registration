import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import Footer from "./components/footer";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app m-8">
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Register />} />
          <Route exact path="/info" render={() => <ClientInformations />} />
          <Route exact path="/recovery" render={() => <Recovery />} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
