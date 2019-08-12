import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../store/modules/auth/actions';
import history from '../../services/history';

import { Container, Content, StyledLink, Button, User } from './styles';

import logo from '../../assets/logo_maior.png';

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(store => store.user.profile);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <Content>
        <aside>
          <Link to="/dashboard">
            <img src={logo} alt="Orbita logo" />
          </Link>
        </aside>

        <nav>
          <StyledLink
            to="/dashboard"
            active={history.location.pathname === '/dashboard' ? 1 : 0}
          >
            Dashboard
          </StyledLink>

          <StyledLink
            to="/profile"
            active={history.location.pathname === '/profile' ? 1 : 0}
          >
            Profile
          </StyledLink>

          <User>
            <img
              src={
                (profile.avatar && profile.avatar.url) ||
                'https://api.adorable.io/avatars/285/abott@adorable.png'
              }
              alt=""
            />

            <ul>
              <li>{profile.name}</li>
              <li>
                <Button type="button" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </ul>
          </User>
        </nav>
      </Content>
    </Container>
  );
}
