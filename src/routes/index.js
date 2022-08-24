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
      <Route path="/" element={<Alunos />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/Aluno" element={<Aluno />} />
        <Route path="/Aluno/:id/edit" element={<Aluno />} />
        <Route path="/Photos/:id" element={<Photos />} />
      </Route>
    </Routes>
  );
}
