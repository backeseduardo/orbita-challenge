import styled from 'styled-components';

export const Form = styled.form`
  box-shadow: 3px 3px 10px -5px rgba(0, 0, 0, 0.75);
`;

export const Avatar = styled.label`
  align-self: center;

  &:hover {
    opacity: 0.7;
  }

  > img {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: 5px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  > input {
    display: none;
  }
`;
