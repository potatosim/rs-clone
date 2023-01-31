import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello, World</div>} />
    </Routes>
  );
};

export default AppRouter;
