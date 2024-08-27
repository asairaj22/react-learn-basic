import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useLoading } from './LoadingContext';

function Loader() {
  const { loading } = useLoading();
  if (!loading) return null;

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <Spinner animation="border" variant='light' role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;