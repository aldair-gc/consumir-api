import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Nav, Separator } from './styled';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaSignInAlt size={24} />
      </Link>
      <Separator />
      <Link to="/login">
        <FaUserAlt size={24} />
      </Link>
    </Nav>
  );
}
