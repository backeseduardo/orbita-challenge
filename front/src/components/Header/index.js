import React from 'react';
import { useDispatch } from 'react-redux';

import { logout } from '../../store/modules/auth/actions';
import history from '../../services/history';

import { Container, Content, StyledLink, Button } from './styles';

import logo from '../../assets/logo_maior.png';

export default function Header() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <Content>
        <aside>
          <img src={logo} alt="Orbita logo" />
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

          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </nav>
      </Content>
    </Container>
  );
}
