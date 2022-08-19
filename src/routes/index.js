import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute';

import Aluno from '../pages/Aluno';
import Alunos from '../pages/Alunos';
import Photos from '../pages/Photos';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routers() {
  return (
    <Routes>
      <Route exact path="/" element={<Alunos />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="*" element={<Page404 />} />
      <Route exat path="/" element={<PrivateRoute />}>
        <Route exact path="/Aluno/" element={<Aluno />} />
        <Route exact path="/Aluno/:id/edit" element={<Aluno />} />
        <Route exact path="/Fotos/:id" element={<Photos />} />
      </Route>
    </Routes>
  );
}
