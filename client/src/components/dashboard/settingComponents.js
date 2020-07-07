import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button, Header, Image, Input, Form,Message
} from 'semantic-ui-react';
import axios from 'axios';
import { Datacontext } from '../context/context';
import userImage from '../../img/user.png';

axios.defaults.withCredentials = true;
export function Avatar() {
  const { name, avatar } = useContext(Datacontext).userData;
  useEffect(() => {
    'updating pictures'
  }, [avatar]);
  return (
    <div style={{ marginTop: '2em' }}>
      <Image
        rounded
        alt="user_avatar"
        src={avatar ? `data:${avatar.mimeType};base64,${avatar.avatar}` : userImage}
        size={avatar ? 'medium' : 'small'}
      />
      <Header as="h1">{name}</Header>
      <br />
    </div>
  );
}

function Logout() {
  const history = useHistory();
  function logout() {
    axios.post('http://localhost:5000/logout')
      .then(({ status }) => {
        if (status === 200) {
          history.push('/register');
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  return (
    <div style={{ marginTop: '1em' }}>
      <Button primary onClick={logout}>Logout</Button>
      <br />
    </div>
  );
}

export function DeleteAcount() {
  const history = useHistory();
  const [showPasswordField, changeState] = useState(false);
  const [hasError,setError] = useState('');
  function deleteAccount(e) {
    e.preventDefault();
    const password = e.target.elements.password.value;
    axios.delete('http://localhost:5000/user', {
      data: {
        password,
      },
    })
      .then(({ status }) => {
        if (status === 200) {
          history.push('/register');
        }
      })
      .catch((e) => {
        const {error} = e.response.data;
        setError(error);
        setTimeout(() => setError(''), 3000);
      });
  }
  return (
    <div>
      <Button
        style={{ marginTop: '1em' }}
        color="red"
        onClick={() => changeState(!showPasswordField)}
      >
        Delete account
      </Button>
      <Form
        onSubmit={deleteAccount}
        autoComplete="off"
        style={{ display: showPasswordField ? '' : 'none', marginTop: '1em' }}
      >
       {
          hasError && 
          <Message 
            style={{marginTop:'0.7em'}} 
            negative 
          >
           <p>{hasError}</p>
          </Message> 
        }
        <Form.Input
          type="password"
          label="Confirm your password"
          name="password"
          autoComplete="off"
        />
        <Button
          type="submit"
          color="red"
        >
          Confirm delete
        </Button>
      </Form>
    </div>
  );
}

export function SettingComponent() {
  const { handlers: { addAvatar } } = useContext(Datacontext);
  const [file, setFile] = useState(undefined);
  const [hasError,setError] = useState('');

  function fileChanger(e) {
    const choosefile = e.target.files[0];
    console.log(choosefile)
    if(choosefile.size > 1000000) {
      setError('Image size must be less than 1mb.');
      return;
    }
    setFile(choosefile);
    setError('');
  }
  function handler() {
    const data = new FormData();
    data.append('avatar', file);
    axios.post('http://localhost:5000/avatar', data)
      .then(({ status, data }) => {
        if (status === 201) {
          const { avatar } = data;
          addAvatar(avatar);
          setFile(undefined);
        }
      })
      .catch((e) => {
        setError(e.response.data.error)
      });
  }
  console.log(hasError)
  return (
    <div>
      <Avatar />
      {
        hasError && 
        <Message 
          style={{marginTop:'0.7em'}} 
          negative 
        >
          <p>{hasError}</p>
        </Message> 
      }
      <Input 
        onChange={fileChanger} 
        type="file" 
        placeholder="Upload avatar" 
      />
      <br />
      <br />
      <Button 
        onClick={handler} 
        color="teal" 
        disabled={file && file.type.includes('image') ? false : true}
      >
        upload
      </Button>
      <br />
      <Logout />
      <DeleteAcount />
    </div>
  );
}

