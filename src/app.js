// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Comparison from './pages/Comparison';
import Editor from './pages/Editor';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/generator" element={<Generator />} />
                        <Route path="/comparison" element={<Comparison />} />
                        <Route path="/editor" element={<Editor />} />
                        {/* Redirect to home for any unknown routes */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
                <footer className="app-footer">
                    <p>Content Generation Tool &copy; {new Date().getFullYear()}</p>
                    <p>
                        Powered by <a href="#" className="mcp-link">Model Context Protocol</a>
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;