import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import GroupeRock from "./components/GroupeRock";
import RechercheGroupeRock from "./components/RechercheGroupeRock";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/artiste/:nom" component={GroupeRock} />
        <Route exact path="/" component={RechercheGroupeRock} />
      </BrowserRouter>
    </div>
  );
}

export default App;
