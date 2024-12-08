import React from 'react';
import Dashboard from '../../components/admin/dashboard';
import Sidebar from '../../components/admin/sidebar';

const Admin = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default Admin;
