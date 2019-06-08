import React from 'react';
import logo from './logo.svg';
import './App.css';
import SubirActor from './components/SubirActor';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ListarPeliculas from './components/ListarPeliculas';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Route path="/subir-actor" component={SubirActor}/>
        <Route exact path="/" component={ListarPeliculas}/>
      </Router>
    </div>
  );
}

export default App;
