import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Title = styled.h1`
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  label {
    width: 180px;
    height: 180px;
    display: flex;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      height: 180px;
      width: 180px;
    }
  }

  input {
    display: none;
  }

  button {
    padding: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: absolute;
    bottom: 10px;
  }
`;
