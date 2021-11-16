import { css } from "./App.css";
import { useEffect } from "react";
import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import RecoveryMethod from "./components/recoveryMethod";

function App() {
  return (
    <div className="app">
      <Header />
      <Register />
      {/* <ClientInformations /> */}
      {/* <RecoveryMethod /> */}
    </div>
  );
}

export default App;
