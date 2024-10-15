import React, { useState } from 'react';
import { loginUser } from '../services/api';
import GenericButton from './GenericButton';

function FormAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await loginUser({ username, password });
      if (response.token) {
        setMessage('Login successful! Token generated.');
        localStorage.setItem('authToken', response.token);
      } else {
        setMessage(response.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Error during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>Username:</label>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter your username" 
        disabled={loading}
      />
      <label>Password:</label>
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Enter your password" 
        disabled={loading}
      />
      <GenericButton onClick={handleLogin} disabled={loading} label="Login" />
      {/* Mensagem de sucesso ou erro */}
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default FormAuth;
