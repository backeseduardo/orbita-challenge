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
      cursor: pointer;
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
  width: 100%;
`;

export const User = styled.div`
  position: relative;
  cursor: pointer;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid #a7a7d6;
  }

  ul {
    position: absolute;
    right: 0;
    top: 60px;
    visibility: hidden;
    opacity: 0;
    background: #fff;
    padding: 20px;
    /* border: 1px solid rgba(0, 0, 0, 0.75); */
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.75);
    z-index: 1;
    transition: 0.3s all;

    li {
      white-space: nowrap;
      color: #5c5c76;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px dotted #ccc;

      &:last-child {
        padding-bottom: 0;
        margin-bottom: 0;
        border: 0;
      }
    }
  }

  &:hover {
    ul {
      visibility: visible;
      opacity: 1;
    }
  }
`;
