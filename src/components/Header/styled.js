import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  gap: 20px;
  color: #fff;

  a {
    color: #fff;
    margin: 0 5px;
    font-weight: bold;
  }
`;
