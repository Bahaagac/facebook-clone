import React from 'react';
import './App.css'
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Feed from './Components/Feed';
import Widget from './Components/Widget';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className="App__body">
        <Sidebar/>
        <Feed/>
        <Widget/>
      </div>
    </div>
  );
}

export default App;
