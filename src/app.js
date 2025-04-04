// src/app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Comparison from './pages/Comparison';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/generator" element={<Generator />} />
                    <Route path="/comparison" element={<Comparison />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;