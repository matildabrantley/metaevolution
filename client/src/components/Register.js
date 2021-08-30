import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import UserAuth from '../utilities/userAuthentication';
import { register } from '../utilities/react-api';
import PhaserWorld from './PhaserWorld';
import Popout from './Popout';



const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const [isDisplayingMessage, setIsDisplayingMessage] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const registerForm = e.currentTarget;

    if (registerForm.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const res = await register(userData);
      if (!res.ok) {
        throw new Error('Uh oh, registration issue occurred');
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
    < PhaserWorld width={1000} height={450} worldType="Shaderfun"/>
    <h3>Register to save and share your evolved agents</h3>
      <Form noValidate validated={isValidated} onSubmit={handleRegistration}>
        <Alert dismissible onClose={() => setIsDisplayingMessage(false)} show={isDisplayingMessage} variant='danger'>
          Issue occurred during registration
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control type='text'
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
          <Form.Control type='email'
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
          <Form.Control type='password'
            placeholder='abcdefgh'
            name='password'
            onChange={handleInputChange}
            value={userData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password needed</Form.Control.Feedback>
        </Form.Group>
        <Button disabled={!(userData.username && userData.email && userData.password)}
          type='submit'
          variant='success'>
          Signup
        </Button>
      </Form>
    </>
  );
};

export default Register;
