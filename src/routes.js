import { Routes, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import HomePage from './components/homepage';
import NotFound from './components/not-found';
import Profile from './components/profile';
import Dashboard from './components/dashboard';
import StructuralDirective from './components/structural-directive';
import AttributeDirective from './components/attribute-directive';
import AxiosAPI from './components/axios-api';
import UseReducerConcept from './components/LifeCycle/useReducerConcept';
import Login from './components/login';
import PrivateRoute from './auth/private-route';
import GuestRoute from './auth/guest-route';

const LazyLoadComponent = lazy(() => import('./components/lazy-loading-component')); // Lazy load

const AppRoutes = () => (
  <Routes>
    {/* <Route path="/" /> */}
    <Route path="/" element={<GuestRoute><Login /></GuestRoute>} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/structural-directive" element={<StructuralDirective/>}/>
    <Route path="/attribute-directive" element={<AttributeDirective/>}/>
    {/* <Route path="/axiosApi" element={<AxiosAPI />} /> */} 
    <Route path="/axiosApi" element={<PrivateRoute><AxiosAPI /></PrivateRoute>} />
    <Route path="/useReducer" element={<UseReducerConcept />} />
    {/* <Route path="/lazyComponent" element={<LazyLoadComponent />} /> */}
    <Route
      path="/lazyComponent"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <LazyLoadComponent />
        </Suspense>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
