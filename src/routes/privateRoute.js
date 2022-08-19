import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const isLoggedIn = true;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

// import { Route, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// export default function MyRoute({ element: Element, isClosed, ...rest }) {
//   const isLoggedIn = false;
//   const navigate = useNavigate();

//   if (isClosed && !isLoggedIn) {
//     return navigate('/login', { state: { prevPath: rest.location.pathname } });
//   }

//   // if (isClosed && !isLoggedIn)
//   // return (
//   // (
//   //   <Redirect
//   //     to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
//   //   />
//   // );

//   // eslint-disable-next-line react/jsx-props-no-spreading
//   return <Route {...rest} element={Element} />;
// }

// MyRoute.defaultProps = {
//   isClosed: false,
// };

// MyRoute.propTypes = {
//   element: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
//   isClosed: PropTypes.bool,
// };
