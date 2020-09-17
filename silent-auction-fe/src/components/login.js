import React from 'react';

const LoginForm = (props) => {
  return(
    <>
    <h1>This is the login page</h1>
    <form>
      <input 
      type="text"
      name="username"
      id="username"/>
    </form>
    </>
  );
}

export default LoginForm;