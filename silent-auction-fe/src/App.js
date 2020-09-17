import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch } from "react-router-dom";
import BidderCard from './Bidder-Cards';
import SellerCard from './Seller-Cards';
import { ItemContext } from './contexts/ItemContext';
function App() {

  const [itemData, SetItemData] = useState([
    {
      name: 'William',
      image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      price: { bidState: true, price: 100 },
      biderName: 'Tim',
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: '15:00 min'
    },
    {
      name: 'William',
      image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
      price: { bidState: false, price: 100 },
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: '15:00 min'
    },
    {
      name: 'William',
      image: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
      price: { bidState: false, price: 100 },
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: '15:00 min'
    },
    {
      name: 'William',
      image: 'https://images.unsplash.com/photo-1519687774292-8ef26b975fc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      price: { bidState: false, price: 100 },
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: '15:00 min'
    },
    {
      name: 'William',
      image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      price: { bidState: false, price: 100 },
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: '15:00 min'
    },
    {
      name: 'William',
      image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE3MzYxfQ&auto=format&fit=crop&w=1466&q=80',
      price: { bidState: false, price: 100 },
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: '15:00 min'
    }
  ])


  return (
    <ItemContext.Provider value={itemData}>
      <div className="App">
        <ul className="navbar">
          <Link to="/BidderCard">Bidder Dashborad</Link>
          <Link to="/SellerCard">Seller Dashborad</Link>
        </ul>
        <Switch>

          <Route exact path="/BidderCard" component={BidderCard} />
          <Route path="/SellerCard" component={SellerCard} />
        </Switch>
      </div>
    </ItemContext.Provider>
  );
}

export default App;
