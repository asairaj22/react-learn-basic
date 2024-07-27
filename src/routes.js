import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" />
    <Route path="/dashboard" element={<HomePage />} />
  </Routes>
);

export default AppRoutes;
