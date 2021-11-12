import { css } from "./App.css";
import { useEffect } from "react";
import Header from "./components/header/index";
import Content from "./components/content/index";

function App() {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
}

export default App;
