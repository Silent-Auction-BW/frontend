import React from 'react';

const SignupForm = (props) => {
  return (
    <>
      <h1>This is the Signup page</h1>
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
        
        <button type="submit">Sign Up</button>
        <button>Login</button>
      </form>
    </>
  );
}

export default SignupForm;