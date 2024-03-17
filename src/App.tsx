import React, {useEffect, useState} from 'react';
import './App.scss';

import {Header, Main} from './components';

const App = () => {
  const [numCircles, setNumCircles] = useState(20); // Используем useState для хранения числа кружков

  useEffect(() => {
    const generateRandomCircles = () => {
      const background = document.querySelector('.background');
      if (background) {
        background.innerHTML = '';
        for (let i = 0; i < numCircles; i++) {
          const circle = document.createElement('div');
          circle.className = 'circle';
          background.appendChild(circle);

          const size = Math.random() * 20;
          const x = Math.random() * window.innerWidth; // Случайная позиция по X
          const y = Math.random() * window.innerHeight; // Случайная позиция по Y

          circle.style.width = `${size}px`;
          circle.style.height = `${size}px`;
          circle.style.left = `${x}px`;
          circle.style.top = `${y}px`;

          const animationDuration = Math.random() * 5 + 5;
          circle.style.animationDuration = `${animationDuration}s`;

          const delay = Math.random() * 5;
          circle.style.animationDelay = `${delay}s`;
        }
      }
    };

    generateRandomCircles();

    // Очистка кружков при размонтировании компонента
    return () => {
      const background = document.querySelector('.background');
      if (background) {
        background.innerHTML = '';
      }
    };
  }, [numCircles]);

  return (
    <div className='App'>
      <div className='background'></div>
      <Header />
      <Main />
    </div>
  );
};

export default App;
