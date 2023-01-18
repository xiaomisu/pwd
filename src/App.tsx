import React from "react";
import { useState } from "react";
import "./App.css";
import { Password } from "./components/container/Password";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Password />
    </div>
  );
}

export default App;
