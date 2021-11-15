import { css } from "./App.css";
import { useEffect } from "react";
import Header from "./components/header/index";
import Register from "./components/register/index";
import ClientInformations from "./components/clientInformations";

function App() {
  return (
    <div className="app">
      <Header />
      {/* <Register /> */}
      <ClientInformations />
    </div>
  );
}

export default App;
