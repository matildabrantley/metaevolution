import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import UserAuth from '../utilities/userAuthentication';
import { login } from '../utilities/react-api';
import Popout from './Popout';


const Login = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [isDisplayingMessage, setIsDisplayingMessage] = useState(false);
  const [validated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginForm = e.currentTarget;

    if (loginForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const res = await login(userData);
      if (!res.ok) {
        throw new Error('Uh oh, login issue occurred');
      }
      const { token, user } = await res.json();
      console.log(user);
      UserAuth.login(token);
    } catch (err) {
      console.error(err);
      setIsDisplayingMessage(true);
    }
    setUserData({ username: '', email: '', password: '' });
  };

  return (
    <>
    <h3>Login to access your saved agentsshare your </h3>
    <h3>evolved agents and share your evolved agents</h3>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setIsDisplayingMessage(false)} show={isDisplayingMessage} variant='danger'>
          Issue occurred during login
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username needed</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='email'>Your Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='email@address.com'
            name='email'
            onChange={handleInputChange}
            value={userData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email needed</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Your Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='abcdefgh'
            name='password'
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password needed</Form.Control.Feedback>
        </Form.Group>
        <Popout>
        <Button
          disabled={!(userData.username && userData.email && userData.password)}
          type='submit'
          variant='success'>
          Login
        </Button>
        </Popout>
      </Form>
    </>
  );
};

export default Login;
