import NotFound from 'pages/NotFoundPage/notFound';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello, World</div>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
