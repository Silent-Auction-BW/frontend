import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import * as yup from "yup";

const Container = styled.div`
  box-shadow: 5px 5px 10px black;
  display: flex;
  height: 400px;
  margin: 0 auto;
  margin-top: 30px;
  max-width: 600px;
`;

const Form = styled.div`
  background-color: #19647e;
  border: 1px solid black;
  color: #f4f9e9;
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
  padding: 3px;
  margin-bottom: 4px;
`;

const Select = styled.select`
  background-color: #f4f9e9;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #28afb0;
  border: none;
  border-radius: 25px;
  color: #f4f9e9;
  font-size: 1.2rem;
  margin: 10px 0;
  padding: 3px 10px;
  &:hover {
    background-color: #550c18;
  }
`;

const Img = styled.img`
  max-width: 300px;
  object-fit: cover;
`;

const Error = styled.p`
  color: orange;
  margin: 0;
  font-size: 0.8rem;
`;

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required("Must include your name.")
    .min(2, "Names must include at least 2 characters"),
  password: yup
    .string()
    .required("Must include your password.")
    .min(4, "Password must be at least 4 characters"),
  role: yup.string().oneOf(["bidder", "seller"], "Please choose a role."),
  email: yup
    .string()
    .email("Must include a valid email")
    .required("Must include your email."),
});

const SignupForm = (props) => {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });

  const [errorState, setErrorState] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(signupData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [signupData]);

  const validate = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();

    axios
      .post(`https://bw-silent-auction-pt.herokuapp.com/register`, signupData)
      .then((res) => {
        console.log("signup res", res);
      })
      .catch((err) => {
        console.log(err);
      });
    setSignupData({
      username: "",
      password: "",
      email: "",
      role: "",
    });
  };

  const history = useHistory();
  const loginReDirect = () => {
    history.push("/login");
  };

  return (
    <Container>
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
          {errorState.username.length > 0 ? (
            <Error>{errorState.username}</Error>
          ) : null}
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
          {errorState.password.length > 0 ? (
            <Error>{errorState.password}</Error>
          ) : null}
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
          
        </label>
        <br/> */}

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
          {errorState.email.length > 0 ? (
            <Error>{errorState.email}</Error>
          ) : null}
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
          {errorState.role.length > 0 ? <Error>{errorState.role}</Error> : null}
          <br />

          <Button disabled={buttonDisabled} type="submit">
            Sign Up
          </Button>

          <div>
            <Button onClick={loginReDirect}>Login</Button>
          </div>
        </form>
      </Form>
    </Container>
  );
};

export default SignupForm;
