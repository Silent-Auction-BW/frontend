import React from 'react';

const LoginForm = (props) => {
  return (
    <>
      <h1>This is the login page</h1>
      <form>
        <label htmlFor="username">
          <input 
          type="text" 
          name="username" 
          id="username" 
          placeholder="Username" />
        </label>
        <br/>

        <label htmlFor="password">
          <input 
          type="password"
          name="password"
          id="password"
          placeholder="Password"/>
        </label>
        <br/>

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;