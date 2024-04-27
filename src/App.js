import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{backgroundImage: `url(${logo})`}}>
        <h1>
          SpaceX Launch Tracker
        </h1>
      </header>
    </div>
  );
}

export default App;
