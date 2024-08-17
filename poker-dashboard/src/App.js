import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/common/sidebar/sidebar';
import Home from './components/pages/home/Home';
import AddGameEntry from './components/pages/AddGame/AddGame';
import PreviousGame from './components/pages/PreviousGame/PreviousGame'; // Import the PreviousGame component
import './App.css';

function App() {
  const userId = 'Ryan Castellarin';

  return (
    <Router>
      <main className="main">
        <div className="app-container d-flex">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="content-container">
            <Routes>
              <Route path="/home" element={<Home userId={userId} />} />
              <Route path="/add-game" element={<AddGameEntry userId={userId} />} />
              <Route path="/previous-games" element={<PreviousGame userId={userId} />} />
            </Routes>
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
