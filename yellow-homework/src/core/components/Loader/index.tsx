import './styles.scss';
import React from 'react';

const Loader: React.FC = React.memo(function Loader() {
  return (
    <div className="loader">
      <div className="loader__content">
        Loading...
      </div>
    </div>
  );
});

export default Loader;
