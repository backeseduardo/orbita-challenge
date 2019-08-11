import styled from 'styled-components';
import { Link } from 'react-router-dom';

import CustomButton from '../Button';

export const Container = styled.div`
  background: #fff;
  box-shadow: 0px 5px 10px -5px rgba(0, 0, 0, 0.75);
  padding: 0 50px;
`;

export const Content = styled.div`
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  aside {
    img {
      width: 120px;
    }
  }

  nav {
    display: flex;
    align-items: center;
  }
`;

export const StyledLink = styled(Link)`
  color: ${props => (props.active ? '#5c5c76' : '#a7a7d6')};
  font-size: 16px;
  font-weight: bold;
  margin-right: 30px;
  transition: all 0.4s;

  :hover {
    color: #5c5c76;
  }
`;

export const Button = styled(CustomButton)`
  padding: 0 20px;
`;
