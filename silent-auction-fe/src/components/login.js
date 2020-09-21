import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #19647E;
  border: 1px solid black;
  box-shadow: 5px 5px 10px black;
  color: #F4F9E9;
  margin: 0 auto;
  max-width: 300px;
  margin-top: 30px;
  padding-bottom: 30px;
`;

const Input = styled.input`
  background-color: #f4f9e9;
  border: 1px solid #28afb0;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #28AFB0;
  border: none;
  border-radius: 25px;
  color: #F4F9E9;
  font-size: 1.2rem;
  margin: 10px 0;
  padding: 3px 10px;

  &:hover {
    background-color: #550C18;
  }
`;

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
  const history = useHistory();
  const signUp = () => {
    history.push("/signup");
  }

  return (
    <Container>
      <h1>Login</h1>
      <form onSubmit={login}>
        <label htmlFor="username">
          <Input 
          type="text" 
          name="username" 
          id="username" 
          placeholder="Username"
          onChange={inputChange} 
          value={loginData.username}/>
        </label>
        <br/>

        <label htmlFor="password">
          <Input 
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={inputChange}
          value={loginData.password} />
        </label>
        <br/>

        <Button type="submit">Login</Button>

        <div>
          <Button onClick={signUp} >Sign Up</Button>
        </div>
      </form>
    </Container>
  );
}

export default LoginForm;