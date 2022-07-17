import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Locations from './Components/Locations';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Locations/>
      <Footer/>
    </div>
  );
}

export default App;
