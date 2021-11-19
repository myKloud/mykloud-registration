import { css } from "./App.css";
import { useEffect } from "react";
import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";
import { Route, Switch } from "react-router-dom";

// process.env.REACT_APP_API_URL;

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
