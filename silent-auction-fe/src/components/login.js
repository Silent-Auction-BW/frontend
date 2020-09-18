import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = (props) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const inputChange = e => {
    e.persist();
    setLoginData({...loginData, [e.target.name]: e.target.value});
  }

  const login = e => {
    e.preventDefault();

    axios
      .post(`https://reqres.in/api/users`, loginData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      setLoginData({
        username: "",
        password: "",
      });
  }

  return (
    <div>
      <h1>This is the login page</h1>
      <form onSubmit={login}>
        <label htmlFor="username">
          <input 
          type="text" 
          name="username" 
          id="username" 
          placeholder="Username"
          onChange={inputChange} 
          value={loginData.username}/>
        </label>
        <br/>

        <label htmlFor="password">
          <input 
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={inputChange}
          value={loginData.password} />
        </label>
        <br/>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;