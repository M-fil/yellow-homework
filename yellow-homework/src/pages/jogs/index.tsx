import './styles.scss';
import React from 'react';

import NoItemsBlock from './components/NoItemsBlock';

const JogsPage: React.FC = () => {
  return (
    <div className="jogging-page">
      <NoItemsBlock />
    </div>
  );
};

export default JogsPage;
