import React from 'react';
import './App.scss';
import Ticket from './components/Ticket';

function App() {
  return (
    <div className="App">
      <div className="App__ticketsContainer">
        <Ticket />
      </div>
    </div>
  );
}

export default App;
