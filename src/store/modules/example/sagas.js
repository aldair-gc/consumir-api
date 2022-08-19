import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as actions from './actions';
import * as types from '../types';

const request = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

function* exampleRequest() {
  try {
    yield call(request);
    yield put(actions.clicaBotaoSuccess());
  } catch {
    toast.error('Sorry...');
    yield put(actions.clicaBotaoFailure());
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
