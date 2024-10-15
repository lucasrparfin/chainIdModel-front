import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../App.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/chainid');
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage('Both username and password are required.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await loginUser({ username, password });
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        window.dispatchEvent(new Event('storage'));  // Força a atualização do estado
        navigate('/chainid');
      } else {
        setMessage(response.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <label>Username:</label>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        onKeyPress={handleKeyPress} 
        placeholder="Enter your username" 
        disabled={loading}
      />
      <label>Password:</label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        onKeyPress={handleKeyPress}
        placeholder="Enter your password" 
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading}>Login</button>
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default LoginPage;
