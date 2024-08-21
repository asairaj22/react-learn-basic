import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage';
import NotFound from './components/not-found';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import StructuralDirective from './components/structural-directive';
import AttributeDirective from './components/attribute-directive';
import AxiosAPI from './components/axios-api';

const AppRoutes = () => (
  <Routes>
    <Route path="/" />
    <Route path="/home" element={<HomePage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/structural-directive" element={<StructuralDirective/>}/>
    <Route path="/attribute-directive" element={<AttributeDirective/>}/>
    <Route path="/axiosApi" element={<AxiosAPI />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
