import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

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

const Select = styled.select`
  background-color: #f4f9e9;
  border: none;
  border-radius: 5px;
`

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

const SignupForm = (props) => {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });

  const inputChange = e => {
    e.persist();
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const signup = e => {
    e.preventDefault();

    axios
      .post(`https://bw-silent-auction-pt.herokuapp.com/register`, signupData)
      .then(res => {
        console.log('signup res', res);
      })
      .catch(err => {
        console.log(err);
      });
    setSignupData({
      username: "",
      password: "",
      role: "",
      email: "",
    });
  }

  const history = useHistory();
  const loginReDirect = () => {
    history.push("/login")
  };



  return (
    <Container>
      {console.log('signupData', signupData)}
      <Img
        src="https://images.unsplash.com/photo-1592500305630-419da01a7c33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        alt="Bidders Sign"
      />
      <Form>
        <h1>Sign Up</h1>
        <form onSubmit={signup}>
          <label htmlFor="username">
            <Input
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
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={inputChange}
              value={signupData.password}
            />
          </label>
          <br />

          {/* <label htmlFor="name">
          <Input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name"
          onChange={inputChange}
          value={signupData.name}
          />
          
        </label> */}
          <br />

          <label htmlFor="email">
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              onChange={inputChange}
              value={signupData.email}
            />
          </label>
          <br />

          <label htmlFor="role">
            <Select
              name="role"
              id="role"
              onChange={inputChange}
              value={signupData.role}
            >
              <option value="">Select an Option</option>
              <option value="bidder">Bidder</option>
              <option value="seller">Seller</option>
            </Select>
          </label>
          <br />

          <Button type="submit">Sign Up</Button>

          <div>
            <Button onClick={loginReDirect}>Login</Button>
          </div>
        </form>
      </Form>
    </Container>
  );
}

export default SignupForm;