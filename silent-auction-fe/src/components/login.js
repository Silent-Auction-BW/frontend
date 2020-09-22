import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { axiosWithAuth } from '../axiosAuth';

const Container = styled.div`
  box-shadow: 5px 5px 10px black;
  display: flex;
  height: 400px;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 600px;
`;

const Form = styled.div`
  background-color: #19647E;
  border: 1px solid black;
  color: #F4F9E9;
  margin: 0 auto;
  width: 300px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Img = styled.img`
  max-width: 300px;
  object-fit: cover
`;

const LoginForm = (props) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const inputChange = e => {
    e.persist();
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  const login = e => {
    e.preventDefault();

    axiosWithAuth()
      .post(`https://bw-silent-auction-pt.herokuapp.com/login`, loginData)

      .then(res => {
        console.log(res);
        localStorage.setItem('token', 'efeijife-fefeife-fefe');
        axiosWithAuth()
          .post(`https://bw-silent-auction-pt.herokuapp.com/login`, loginData)
        res.data.message.includes("seller") === true
          ?
          props.history.push('/SellerCard')
          :
          props.history.push('/BidderCard')

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
      <Img
        src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1505&q=80"
        alt="Auction Gavel" />
      <Form>
        <h1>Sign In</h1>
        <form onSubmit={login}>
          {/* <inputContainer> */}
          <label htmlFor="username">
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              onChange={inputChange}
              value={loginData.username} />
          </label>
          <br />

          <label htmlFor="password">
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={inputChange}
              value={loginData.password} />
          </label>
          <br />
          {/* </inputContainer> */}

          <Button type="submit">Login</Button>

          <div>
            <Button onClick={signUp} >Sign Up</Button>
          </div>
        </form>
      </Form>
    </Container>
  );
}

export default LoginForm;