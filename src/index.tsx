import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persist, store } from './store/store';
import Splash from './pages/Splash/Splash';
import { sleep } from './utils/utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        onBeforeLift={async () => {
          //await sleep(500);
        }}
        loading={<Splash />}
        persistor={persist}
      >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
