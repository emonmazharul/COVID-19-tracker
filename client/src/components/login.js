import React, { useState } from 'react';
import {
  Form, Button, Segment, Header, Icon, Grid,
} from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormMessage } from './message';

axios.defaults.withCredentials = true;

function Login({ signupShower }) {
  const history = useHistory();
  const [formMessage, setFormMessage] = useState({
    messageName: '',
    messageInfo: undefined,
    messageType: undefined,
  });
  const [buttonLoading,changeState] = useState(false);

  function handler(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    changeState(true)
    axios.post('/login', {
      email: email.value,
      password: password.value,
    })
      .then(({ status }) => {
        if (status === 201) {
          setFormMessage({
            ...formMessage,
            messageType: 'success',
            messageName: 'Successfully Loged in',
            messageInfo: 'Redirecing to your dashboard',
          });
          history.push('/dashboard');
          changeState(false)
        }
      })
      .catch(({ response }) => {
        const { error } = response.data;
        setFormMessage({
          ...formMessage,
          messageType: 'error',
          messageName: 'Failed',
          messageInfo: error,
        });
        changeState(false)
      });
  }

  return (
    <Grid style={{ height: '100vh' }} verticalAlign="middle" centered>
      <Grid.Row>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment padded="very">
            <Header>
              Login
              {' '}
              <Icon name="sign-in" />
            </Header>
            {formMessage.messageName && formMessage.messageName
							&& (
<FormMessage
  messageName={formMessage.messageName}
  messageInfo={formMessage.messageInfo}
  messageType={formMessage.messageType}
/>
							)}
            <Form onSubmit={handler}>
              <Form.Input
                type="email"
                name="email"
                icon="mail"
                iconPosition="left"
                label="Email"
                placeholder="Email"
                required
              />
              <Form.Input
                type="password"
                name="password"
                icon="lock"
                iconPosition="left"
                label="Password"
                min={8}
                required
              />
              <Button type="submit" content="Login" primary loading={buttonLoading} />
            </Form>
            <br />
            <p>
              Don&apos;t have an account
              <Button
                onClick={signupShower}
                style={{ marginLeft: '0.5em' }}
                secondary
                content="Signup"
              />
            </p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Login;
