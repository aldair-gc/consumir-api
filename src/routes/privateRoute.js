import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    <Navigate to="/login" state="prevPath: rest.location.pathname" />;
  }

  return <Outlet />;
}
