import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserInfoFromToken } from '../utils/authUtils';

function AdminMenu() {
    const { role } = getUserInfoFromToken();
    const location = useLocation();

  if (role !== 'admin') {
    return null;
  }

  return (
    <nav className="admin-menu">
      <ul>
        <li>
          <Link 
            to="/chainid" 
            className={location.pathname === '/chainid' ? 'active-link' : ''}
          >
            ChainID Management
          </Link>
        </li>
        <li>
          <Link 
            to="/all-chainids" 
            className={location.pathname === '/all-chainids' ? 'active-link' : ''}
          >
            All ChainIDs
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminMenu;
