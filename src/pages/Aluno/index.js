import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import get from 'lodash';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Container } from '../../styles/global';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/aluno/${id}`);
        const fotoUrl = get(data, 'Photos[0].url', '');

        setFoto(fotoUrl);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsloading(false);
      } catch (err) {
        setIsloading(false);
        console.log(err);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.erros', []);

        if (status === 400) errors.map((error) => toast.error(error));
      }
    }

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail invalido');
    }
    if (idade <= 0 || idade > 150) {
      formErrors = true;
      toast.error('idade invalida');
    }
    if (peso <= 0 || peso > 300) {
      formErrors = true;
      toast.error('peso invalido');
    }
    if (altura <= 0 || altura > 300) {
      formErrors = true;
      toast.error('altura invalida');
    }

    if (formErrors) return;

    try {
      setIsloading(true);
      if (id) {
        // editando
        await axios.put(`/aluno/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Alteracoes salvas');
      } else {
        // criando
        await axios.post(`/aluno`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno salvado');
        history.push('/');
      }
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(err, 'response.data.erros', []);

      if (errors.length > 0) errors.map((error) => toast.error(error));

      if (status === 401) dispatch(actions.loginFailure());

      console.log(data);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/photos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="altura"
        />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
