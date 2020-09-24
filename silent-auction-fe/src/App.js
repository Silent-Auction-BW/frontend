import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from "react-router-dom"
import './App.css';
import ItemForm from "./components/ItemForm";
import LoginForm from './components/login';
import SignupForm from './components/signup';
import { Route, Link, Switch } from "react-router-dom";
import BidderCard from './components/Bidder-Cards';
import SellerCard from './components/Seller-Cards';
import { ItemContext } from './contexts/ItemContext';
import { axiosWithAuth } from './axiosAuth';
import UpdateForm from "./components/UpdateForm";
import { PrivateRoute } from '../src/PrivateRoute';
import styled from 'styled-components';

const NavBar = styled.header`
  box-shadow: 0 5px 10px black;
  display: flex;
  justify-content: center;
  background-color: #19647e;
  margin: 0;
  padding-bottom: 10px;
  height: 50px;
`;

function App() {

  const [itemData, SetItemData] = useState([
    {
      item_name: 'Appdddle',
      price: 100,
      itemState: true,
      description: 'WilliamMarkup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      image_url: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      timer: 1600723599125,
      item_id: 0,
      seller_id: 1,
      timer_length: 540000000
    },
    {
      seller_id: 'William',

      price: 100,
      item_name: 'Apple',
      image_url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80',
      itemState: false,
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: 1600723599125,
      timer_length: 720000000
    },
    {
      seller_id: 'William',

      price: 100,
      item_name: 'Apple',
      image_url: 'https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
      itemState: false,
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: 1600723599125,
      timer_length: 1080000000
    },
    {
      seller_id: 'William',
      price: 100,
      item_name: 'Apple',
      image_url: 'https://images.unsplash.com/photo-1519687774292-8ef26b975fc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      itemState: true,
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: 1600723599125,
      timer_length: 1800000000
    },
    {
      seller_id: 'William',
      price: 100,
      item_name: 'Apple',
      image_url: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      itemState: true,
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: 1600723599125,
      timer_length: 2160000000
    },
    {
      seller_id: 'William',
      price: 100,
      item_name: 'Apple',
      image_url: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjE3MzYxfQ&auto=format&fit=crop&w=1466&q=80',
      itemState: false,
      description: 'Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data Markup Data ',
      timer: 1600723599125,
      timer_length: 180000000
    }
  ])

  useEffect(() => {
    axiosWithAuth().get('https://bw-silent-auction-pt.herokuapp.com/items')
      .then(res => {
        SetItemData(res.data);
        console.log('get item scc,', res)
      })
      .catch(err => console.log(err));
  }, [])

  const [loginState, setLoginState] = useState(false);
  const loginStateSetter = (state) => {
    setLoginState(state)
  }

  const [loginData, setLoginData] = useState('');
  const loginDataSetter = data => {
    setLoginData(data)
  }

  const [addingItem, setAddingItem] = useState(false);
  const addingItemSetter = state => {
    setAddingItem(state)
  }

  useEffect(() => console.log('loginData Changes:', loginData), [loginData]);

  const handleLogout = () => {
    localStorage.setItem('token', '');
    setLoginState(false);
  }

  return (

    <ItemContext.Provider value={
      {
        itemData: itemData,
        loginStateSetter: loginStateSetter,
        loginDataSetter: loginDataSetter,
        loginData: loginData,
        addingItemSetter: addingItemSetter
      }
    }>
      <div className="App">
        <NavBar>
          <ul className="navbar">
            {
              loginState == false
                ?
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
                :
                <>
                  <Link to="/BidderCard">Bidder Dashboard</Link>
                  <Link to="/SellerCard">Seller Dashboard</Link>
                  <Link to="/login" onClick={handleLogout}>Logout</Link>
                </>
            }

            <NavLink exact to="/sellers/:id/item-form">
              Add Item
            </NavLink>
          </ul>
        </NavBar>

        <Switch>


          <Route path="/login" component={LoginForm} loginStateSetter={loginStateSetter}></Route>
          <Route path="/signup" component={SignupForm} loginStateSetter={loginStateSetter}></Route>
          <PrivateRoute path="/BidderCard" component={BidderCard} />
          <PrivateRoute path="/SellerCard" component={SellerCard} />
          <Route path="/sellers/:id/item-form" component={ItemForm}></Route>
          <Route
            path="/update-item/:id"
            render={() => <UpdateForm item={itemData} setItem={SetItemData} />}
          />


        </Switch>

      </div>
    </ItemContext.Provider>
  );
}

export default App;
