import React from 'react';
import './App.scss';

import {Header, Main} from './components';
import Circles from './components/ui/Circles';

const App = () => {
  return (
    <div className='App'>
      <div className='background'>
        <Circles />
      </div>
      <Header />
      <Main />
    </div>
  );
};

export default App;
