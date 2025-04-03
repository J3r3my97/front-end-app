// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    // Determine which nav item is active
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <h1>Content Generator</h1>
                    </Link>
                </div>

                <nav className="main-nav">
                    <ul className="nav-links">
                        <li className={isActive('/')}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={isActive('/generator')}>
                            <Link to="/generator">Generate</Link>
                        </li>
                        {/* Only show these links if they're accessible based on state */}
                        <li className={`${isActive('/editor')} ${localStorage.getItem('editingContent') ? '' : 'disabled'}`}>
                            <Link to={localStorage.getItem('editingContent') ? '/editor' : '#'}>
                                Editor
                            </Link>
                        </li>
                        <li className={`${isActive('/comparison')} ${localStorage.getItem('compareContent') ? '' : 'disabled'}`}>
                            <Link to={localStorage.getItem('compareContent') ? '/comparison' : '#'}>
                                Comparison
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="mcp-status">
                    <span className="status-indicator connected">
                        MCP Server: Connected
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;