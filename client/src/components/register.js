import React, { useState } from 'react';
import Signup from './signup';
import Login from './login';

function Register() {
  const [showSignup, changeState] = useState(false);

  function changeComponent() {
    changeState(!showSignup);
  }
  return (
    <React.Fragment>
      {showSignup && <Signup loginShower={changeComponent} />}
      {!showSignup && <Login signupShower={changeComponent} />}
    </React.Fragment>
  );
}

export default Register;
