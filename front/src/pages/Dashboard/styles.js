import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  color: #fff;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > strong {
      font-size: 24px;
      font-weight: 500;
    }

    > span {
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

export const Widgets = styled.div`
  margin: 0 -10px;

  display: flex;
  flex-wrap: wrap;
`;

export const Widget = styled.div`
  ${props =>
    props.color === 'one' &&
    css`
      background: linear-gradient(135deg, #7ca0ff, #efa4ff);
    `}
  ${props =>
    props.color === 'two' &&
    css`
      background: linear-gradient(-135deg, #e8a0ec, #ffcc7d);
    `}
  ${props =>
    props.color === 'three' &&
    css`
      background: linear-gradient(45deg, #78d8fe, #37f1a6);
    `}
  border-radius: 4px;
  /* color: ${darken(0.05, '#fff')}; */
  padding: 20px;
  margin: 10px;

  flex: 1 0 350px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    > strong {
      font-size: 20px;
      font-weight: 500;
    }

    > aside {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      > span {
        font-size: 14px;
        font-weight: 500;
        color: ${darken(0.05, '#fff')};
        margin-bottom: 2px;
      }

      > strong {
        font-size: 16px;
        font-weight: 900;
        white-space: nowrap;
      }
    }
  }

  > strong {
    font-size: 24px;
    font-weight: 900;
  }
`;
