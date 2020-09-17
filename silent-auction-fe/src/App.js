import React from 'react';
import {Route,NavLink }from "react-router-dom"
import './App.css';
import ItemForm from "./components/ItemForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavLink exact to ="/item-form">Add Item</NavLink>
        <Route path="/item-form" component={ItemForm}></Route>
      </header>
    </div>
  );
}

export default App;
