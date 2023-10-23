import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './components/application';

import { makeServer } from './api';

import ApplicationContext from './context';
import data from './api/data.json';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { fetchTasks } from './features/task-slice';
import * as Sentry from '@sentry/react';

const environment = process.env.NODE_ENV;
makeServer({ environment });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchTasks());

Sentry.init({
  dsn: 'https://57e08721f5b1a9f245e19b053c0282c2@o4506102178578432.ingest.sentry.io/4506102180413440',
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        'localhost',
        'https://alexodan.github.io/supertasker/',
        /^https:\/\/yourserver\.io\/api/,
      ],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

root.render(
  <React.StrictMode>
    <ApplicationContext.Provider value={data}>
      <Provider store={store}>
        <Application />
      </Provider>
    </ApplicationContext.Provider>
  </React.StrictMode>,
);
