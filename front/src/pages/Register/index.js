import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import schemaValidate from './schemaValidate';

import logo from '../../assets/logo_maior.png';

function Register() {
  const [states, setStates] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  function handleErrors(errors) {
    errors.forEach(error => {
      switch (error.path) {
        case 'name':
          setNameError(error.message);
          break;

        case 'email':
          setEmailError(error.message);
          break;

        case 'state':
          setStateError(error.message);
          break;

        case 'password':
          setPasswordError(error.message);
          break;

        case 'confirmPassword':
          setConfirmPasswordError(error.message);
          break;

        default:
          break;
      }
    });
  }

  function clearErrors() {
    setNameError(null);
    setEmailError(null);
    setStateError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
  }

  async function createAccount(params) {
    try {
      await api.post('/users', params);

      toast.success('Yeehaa! Your account has been created!');

      setTimeout(() => {
        history.push('/');
      }, 1500);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    clearErrors();

    try {
      await schemaValidate({ name, email, state, password, confirmPassword });

      createAccount({ name, email, state, password, confirmPassword });
    } catch (err) {
      handleErrors(err.inner);
    }
  }

  useEffect(() => {
    async function loadStates() {
      try {
        const response = await api.get('/states');

        setStates(response.data);
      } catch (err) {
        toast.error(
          'An error happened while trying to load states. Please try again.'
        );
      }
    }

    loadStates();
  }, []);

  return (
    <>
      <img src={logo} alt="Orbita logo" />

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {nameError && <span>{nameError}</span>}

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {emailError && <span>{emailError}</span>}

        <select
          name="state"
          value={state}
          onChange={e => setState(e.target.value)}
        >
          <option value="">Select your state</option>
          {states.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        {stateError && <span>{stateError}</span>}

        <input
          type="password"
          name="password"
          placeholder="Passowrd"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {passwordError && <span>{passwordError}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />

        {confirmPasswordError && <span>{confirmPasswordError}</span>}

        <button type="submit">Create a free account</button>

        <Link to="/">I already have an account</Link>
      </form>
    </>
  );
}

export default Register;
