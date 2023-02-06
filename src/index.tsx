import AppRouter from 'routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import FirebaseProvider from 'components/FirebaseProvider/FirebaseProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <FirebaseProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </FirebaseProvider>,
);
