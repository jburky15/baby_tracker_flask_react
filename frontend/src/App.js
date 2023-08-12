import axios from 'axios';
import { format } from 'date-fns';
import './App.css';
import InputForm from './components/inputForm/InputForm';
import React from 'react';

const baseUrl = "http://localhost:5000"

function App() {
  return (
    <div className="App">
      <InputForm />
    </div>
  );
}

export default App;
