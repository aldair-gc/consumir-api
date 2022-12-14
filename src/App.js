import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import history from './services/history';

// import history from './services/history';
import store, { persistor } from './store';
import Routes from './routes/index';
import GlobalStyle from './styles/global';
import Header from './components/Header';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HistoryRouter history={history}>
          <Header />
          <Routes />
          <ToastContainer autoClose={3000} />
          <GlobalStyle />
        </HistoryRouter>
      </PersistGate>
    </Provider>
  );
}
