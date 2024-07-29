import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import NotFound from './components/not-found';
import Profile from './components/profile';
import Dashboard from './components/dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" />
    <Route path="/home" element={<HomePage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
