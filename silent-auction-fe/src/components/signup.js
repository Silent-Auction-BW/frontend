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

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <label htmlFor="username">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
        </label>
        <br />

        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
        <br />

        <label htmlFor="name">
          <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name"/>
        </label>
        <br/>

        <label htmlFor="email">
          <input 
          type="text"
          name="email"
          id="email"
          placeholder="Email"/>
        </label>
        <br/>

        <label htmlFor="role">
          <select 
          name="role" 
          id="role">
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