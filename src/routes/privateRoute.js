import { useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

export default function PrivateRoute() {
  const { pathname } = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return isLoggedIn ? <Outlet /> : <Login state={{ prevPath: pathname }} />;
}
