import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import { Route, Switch } from "react-router-dom";

import "./css/global.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Register />} />
        <Route exact path="/info" render={() => <ClientInformations />} />
        <Route exact path="/recovery" render={() => <Recovery />} />
      </Switch>
    </div>
  );
}

export default App;
