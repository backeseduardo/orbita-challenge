import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  background: #5c5c76;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  /* background: linear-gradient(135deg, #7337d2, #a186ce); */
  background: #fff;
  border: 0;
  border-radius: 4px;
  width: 100%;
  max-width: 500px;
  padding: 30px;

  display: flex;
  flex-direction: column;

  img {
    width: 276px;
    height: 86px;

    align-self: center;
  }

  form {
    margin-top: 30px;

    display: flex;
    flex-direction: column;

    input,
    select {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 20px;
      color: #5d5d75;
      margin-top: 10px;

      &::placeholder {
        color: ${lighten(0.03, '#5d5d75')};
      }
    }

    span {
      color: #cc5d65;
      margin-top: 3px;
    }

    button {
      background: #7337d2;
      border: 2px solid #7337d2;
      border-radius: 4px;
      height: 44px;
      color: #fff;
      font-weight: 500;
      margin-top: 10px;
      transition: all 0.4s;

      &:hover {
        background: #fff;
        color: #7337d2;
      }
    }

    a {
      color: #5d5d75;
      font-weight: bold;
      margin-top: 10px;

      align-self: center;

      &:hover {
        color: ${lighten(0.1, '#5d5d75')};
      }
    }
  }
`;
