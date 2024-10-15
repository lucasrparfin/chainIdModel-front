import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChainIDPage from './pages/ChainIDPage';
import AllChainIDsPage from './pages/AllChainIDsPage';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

const isAdmin = () => {
  const token = localStorage.getItem('authToken');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  return decodedToken?.role === 'admin';
};

function App() {
  const [auth, setAuth] = useState(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/chainid" 
          element={auth ? <ChainIDPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/all-chainids" 
          element={auth && isAdmin() ? <AllChainIDsPage /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to={auth ? "/chainid" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
