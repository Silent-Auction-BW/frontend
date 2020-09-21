import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const SignupForm = (props) => {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: "",
  });
  
  const inputChange = e => {
    e.persist();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const signup = e => {
    e.preventDefault();

    axios
      .post(`https://reqres.in/api/users`, signupData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      setSignupData({
        username: "",
        password: "",
        name: "",
        email: "",
        role: ""
      });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={signup}>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={inputChange}
            value={signupData.username}
          />
        </label>
        <br />

        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={inputChange}
            value={signupData.password}
          />
        </label>
        <br />

        <label htmlFor="name">
          <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name"
          onChange={inputChange}
          value={signupData.name}
          />
          
        </label>
        <br/>

        <label htmlFor="email">
          <input 
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          onChange={inputChange}
          value={signupData.email}
          />
        </label>
        <br/>

        <label htmlFor="role">
          <select 
          name="role" 
          id="role"
          onChange={inputChange}
          value={signupData.role}
          >
            <option value="">Select an Option</option>
            <option value="bidder">Bidder</option>
            <option value="seller">Seller</option>
          </select>
        </label>
        <br/>
        
        <button type="submit">Sign Up</button>
        <button>Login</button>
      </form>
    </div>
  );
}

export default SignupForm;