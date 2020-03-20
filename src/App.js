import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Username from "./components/Username";
import ListeHobbies from "./components/ListeHobbies";
import Photos from "./components/Photos";
import { BrowserRouter, Route, Link } from "react-router-dom";
import TestMaterialUI from "./components/TestMaterialUI";
import GroupeRock from "./components/GroupeRock";
import RechercheGroupeRock from "./components/RechercheGroupeRock";

function App() {
  let nom = "Hello Madagascar";

  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home</Link>
        &nbsp;
        <Link to="/rock">Groupe Rock</Link>
        &nbsp;
        <Link to="/rechercheGroupeRock">Recherche Groupe Rock</Link>
        &nbsp;
        <Link to="/ui">Test Material UI</Link>
        &nbsp;
        <Link to="/photos">Photos</Link>
        &nbsp;
        <Link to="/username">Username</Link>
        
        <Route exact path="/" component={ListeHobbies}></Route>
        <Route path="/ui" component={TestMaterialUI}></Route>
        <Route path="/photos/:id" component={Photos}></Route>
        <Route
          path="/username"
          component={() => <Username name="Michel" age="54" />}
        />
        <Route path="/rock/:nom" component={GroupeRock} />
        <Route path="/rechercheGroupeRock" component={RechercheGroupeRock} />
      </BrowserRouter>
    </div>
  );
}

export default App;
