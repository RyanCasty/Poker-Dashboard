import React from 'react';
import { NavLink } from "react-router-dom";
import './sidebar.css';

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-user">
                <span className="material-symbols-outlined user-icon">account_circle</span>
                <div className="user-info">
                    <h3>Ryan Castellarin</h3>
                    <p>ryan.castellarin@gmail.com</p>
                </div>
            </div>
            <div className="sidebar-header">
                <h2>Poker Tracker</h2>
            </div>
            <nav className="sidebar-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/home" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add-game" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            Add Game
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/previous-games" className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                            Previous Games
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
