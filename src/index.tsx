import AppRouter from 'routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import FirebaseProvider from 'components/FirebaseProvider/FirebaseProvider';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import ThemeChanger from 'components/ThemeChanger';
import './i18n';
import CircularProgress from '@mui/material/CircularProgress';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <FirebaseProvider>
    <ThemeChanger>
      <BrowserRouter>
        <Suspense fallback={<CircularProgress />}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </ThemeChanger>
  </FirebaseProvider>,
);
