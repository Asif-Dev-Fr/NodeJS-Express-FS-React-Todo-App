import React, { useState, useEffect } from 'react';
import './App.css';
import Cards from './Cards.js';

function App() {

  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/cards");
      const data = await response.json();
      setResults(data);
    };
    fetchData();
  },[]);

  const handleInput = (e) => {
    setInput(e.target.value);
  }

  const addCard = async () => {
    try {
        await fetch("http://localhost:5000/api/cards/", {
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
        body: JSON.stringify({
          message: input
        })

      });
    } catch(e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Projet Nodejs Express File System React</h1>
        <h2> To do list </h2>
        
        <form id="to-do-form" onSubmit={addCard} >
          <input type="text" placeholder="Entrez votre liste"  value={input} onChange={handleInput}  />
          <button type="submit">Ajouter</button>
        </form>
      </header>

      <main>
        <Cards cards={results} />
      </main>

    </div>
  );
};

export default App;
