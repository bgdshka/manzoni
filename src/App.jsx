import React from 'react';
import { ToastContainer } from 'react-toastify';
import Ticket from './components/Ticket';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      <div className="App__ticketsContainer">
        <Ticket />
      </div>
    </div>
  );
}

export default App;
