import { css } from "./App.css";
import { useEffect } from "react";
import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";
import Recovery from "./components/recovery";

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Register /> */}
      {/* <ClientInformations /> */}
      <Recovery />
    </div>
  );
}

export default App;
