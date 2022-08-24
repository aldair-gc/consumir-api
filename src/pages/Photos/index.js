import { useEffect, useState } from 'react';
import { get } from 'lodash';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaEraser } from 'react-icons/fa';
import { Container } from '../../styles/global';
import Loading from '../../components/Loading';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Photos() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const [foto, setFoto] = useState('');
  let change = 0;

  useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/aluno/${id}`);
        setFoto(get(data, 'Photos[0].url', ''));
        setIsloading(false);
      } catch {
        toast.error('Erro ao obter a imagem');
        setIsloading(false);
        history.go(-1);
      }
    };
    getData();
  }, [id, change]);

  const handleChange = async (e) => {
    const pic = e.target.files[0];
    const fotoURL = URL.createObjectURL(pic);
    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('photo', pic);

    try {
      setIsloading(true);

      await axios.post('/photo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Foto enviada');

      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      const status = get(err, 'response', '');
      toast.error('Erro ao enviar foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  const deletePhoto = async () => {
    try {
      setIsloading(true);

      const { data } = await axios.delete(`/photo/${id}`);
      if (data.photoDeleted) toast.success('Foto excluida');
      setFoto('');
      change += 1;
      history.push(`/aluno/${id}/edit`);

      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      const status = get(err, 'response', '');
      toast.error('Erro ao excluir foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Photos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Adicionar'}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
        <button type="button" onClick={deletePhoto}>
          <FaEraser size={24} />
        </button>
      </Form>
    </Container>
  );
}
