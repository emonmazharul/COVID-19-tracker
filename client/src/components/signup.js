import React, { useState } from 'react';
import {
  Form, Button, Segment, Header, Icon, Grid,
} from 'semantic-ui-react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { FormMessage } from './message';

axios.defaults.withCredentials = true;

function Signup({ loginShower }) {
  const history = useHistory();
  const [formMessage, setFormMessage] = useState({
    messageName: '',
    messageInfo: undefined,
    messageType: undefined,
  });
  const [buttonLoading,changeState] = useState(false);

  function handler(e) {
    e.preventDefault();
    const { name, email, password } = e.target.elements;
    changeState(true)
    axios.post('/user', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
      .then(({ status }) => {
        if(status === 201) { 
          setFormMessage({
            ...formMessage,
            messageType: 'success',
            messageName: 'Successfully create your account',
            messageInfo: 'Redirecing to your dashboard',
          })
          history.push('/dashboard')
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
        changeState(false);
      });
  }
  return (
    <Grid verticalAlign="middle" centered style={{ height: '100vh' }}>
      <Grid.Row columns={1}>
        <Grid.Column mobile={16} tablet={8} computer={8}>
          <Segment padded="very">
            <Header>
              Signup
              {' '}
              <Icon name="signup" />
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
                label="Your name"
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
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
                required
              />
              <Button type="submit" content="Sign up" primary loading={buttonLoading} />
            </Form>
            <br />
            <p>
              Already have an account
              <Button
                onClick={loginShower}
                style={{ marginLeft: '0.5em' }}
                secondary
                content="Login"
              />
            </p>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Signup;
