import React, { useState } from 'react';
import GenericButton from './GenericButton';
import { validateChainID, registerChainID } from '../services/api';

function FormChainID({ chainID, onInputChange, setResponse, response, setChainID }) {
  const [loading, setLoading] = useState(false);

  const handleValidation = async () => {
    if (!chainID.trim()) {
      setResponse({ message: 'Please enter a valid ChainID before validating.' });
      return;
    }

    setLoading(true);
    try {
      const result = await validateChainID(chainID);
      setResponse(result);
    } catch (error) {
      setResponse({ message: 'Error validating ChainID.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {

    if (!chainID.trim()) {
      setResponse({ message: 'Please enter a valid ChainID before validating.' });
      return;
    }
    
    setLoading(true);
    try {
      const result = await registerChainID(chainID);
      setResponse(result);
      
      if (result.message.includes('registered successfully')) {
        setChainID('');
      }
    } catch (error) {
      setResponse({ message: 'Error registering ChainID.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onInputChange({ target: { value: suggestion } });
  };

  return (
    <div>
      <label>ChainID:</label>
      <input 
        type="text" 
        value={chainID} 
        onChange={onInputChange} 
        placeholder="Enter ChainID" 
        disabled={loading}
      />
      <GenericButton onClick={handleValidation} disabled={loading} label="Validate ChainID" />
      <GenericButton onClick={handleRegister} disabled={loading} label="Register ChainID" />
      
      {response && <div>{response.message}</div>}

      {response && response.suggestions && response.suggestions.length > 0 && (
        <div>
          {response.suggestions.map((suggestion, index) => (
            <button 
              key={index} 
              className="suggestion" 
              onClick={() => handleSuggestionClick(suggestion)} 
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default FormChainID;
