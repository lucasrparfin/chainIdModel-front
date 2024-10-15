import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import { getUserInfoFromToken } from '../utils/authUtils';
import '../App.css';

function Header() {
  const { username, role } = getUserInfoFromToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="user-info">
        <p>Username: {username}</p>
        <p>Role: {role}</p>
      </div>
      <AdminMenu />
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
}

export default Header;
