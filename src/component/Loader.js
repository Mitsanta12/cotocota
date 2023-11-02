import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="hypnotic"></div>
      <p className="chargement">Chargement en cours...</p>
    </div>
  );
}

export default Loader;
