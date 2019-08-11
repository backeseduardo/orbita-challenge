import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import api from '../../services/api';

import { updateProfileRequest } from '../../store/modules/user/actions';

import schemaValidate from './schemaValidate';

function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(store => store.user.profile);

  const [states, setStates] = useState([]);

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [state, setState] = useState(profile.state);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [oldPasswordError, setOldPasswordError] = useState(null);
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

        case 'oldPassword':
          setOldPasswordError(error.message);
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
    setOldPasswordError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    clearErrors();

    try {
      await schemaValidate({
        name,
        email,
        state,
        oldPassword,
        password,
        confirmPassword,
      });

      dispatch(
        updateProfileRequest({
          name,
          email,
          state,
          oldPassword,
          password,
          confirmPassword,
        })
      );
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
          name="oldPassword"
          placeholder="Old Passowrd"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />

        {oldPasswordError && <span>{oldPasswordError}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
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

        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default Profile;
