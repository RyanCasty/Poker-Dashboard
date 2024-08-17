// src/components/Dashboard.js

import React from 'react';
import './home.css';

function Dashboard({ userId }) {

    return (
        <div className="dashboard-container">

            <div className="dashboard-row">
                <div className="dashboard-column">
                    <div className="dashboard-box">Customers</div>
                    <div className="dashboard-box">Orders</div>
                </div>
                <div className="dashboard-column">
                    <div className="dashboard-box">Customers</div>
                    <div className="dashboard-box">Orders</div>
                </div>
                <div className="dashboard-box-right">Orders</div>
            </div>
        </div>
    );
}

export default Dashboard;
