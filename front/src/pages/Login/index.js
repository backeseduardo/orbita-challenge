import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginRequest } from '../../store/modules/auth/actions';

// import history from '../../services/history';

import logo from '../../assets/logo_maior.png';

function Login() {
  const dispatch = useDispatch();

  const loading = useSelector(store => store.auth.loading);
  const loggedIn = useSelector(store => store.auth.loggedIn);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(loginRequest(email, password));

    // try {
    //   await api.post('/sessions', {
    //     email,
    //     password,
    //   });

    //   // history.push('/dashboard');
    // } catch (err) {
    //   if (err.response) {
    //     toast.error(err.response.data.message);
    //   } else {
    //     toast.error(err.message);
    //   }
    // }
  }

  return (
    <>
      <img src={logo} alt="Orbita logo" />

      {loading && <span>Carregando...</span>}

      {loggedIn && <span>Logado</span>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <Link to="/register">I do not have an account (Yet)</Link>
      </form>
    </>
  );
}

export default Login;
