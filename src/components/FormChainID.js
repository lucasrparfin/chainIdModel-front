import React, { useState } from 'react';
import GenericButton from './GenericButton';
import { validateChainID, registerChainID } from '../services/api';

function FormChainID({ setResponse, response }) {
  const [chainID, setChainID] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [rpcUrl, setRpcUrl] = useState('');
  const [subnetChainId, setSubnetChainId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'chainID') setChainID(value);
    if (name === 'nodeName') setNodeName(value);
    if (name === 'rpcUrl') setRpcUrl(value);
    if (name === 'subnetChainId') setSubnetChainId(value);
  };

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
    if (!chainID.trim() || !nodeName.trim()) {
      setResponse({ message: 'Please enter all required fields.' });
      return;
    }
    
    setLoading(true);
    try {
      const result = await registerChainID(chainID, nodeName, rpcUrl, subnetChainId);
      setResponse(result);
      if (result.message.includes('registered successfully')) {
        setChainID('');
        setNodeName('');
        setRpcUrl('');
        setSubnetChainId('');
      }
    } catch (error) {
      setResponse({ message: 'Error registering ChainID.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label>ChainID:</label>
      <input 
        type="text" 
        name="chainID"
        value={chainID} 
        onChange={handleInputChange} 
        placeholder="Enter ChainID" 
        disabled={loading}
      />
      <label>Node Name:</label>
      <input 
        type="text" 
        name="nodeName"
        value={nodeName} 
        onChange={handleInputChange} 
        placeholder="Enter the node name" 
        disabled={loading}
      />
      <label>RPC Url:</label>
      <input 
        type="text" 
        name="rpcUrl"
        value={rpcUrl} 
        onChange={handleInputChange} 
        placeholder="Enter the RPC Url" 
        disabled={loading}
      />
      <label>Subnet ChainID:</label>
      <input 
        type="text" 
        name="subnetChainId"
        value={subnetChainId} 
        onChange={handleInputChange} 
        placeholder="Enter the Subnet ChainId" 
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
              onClick={() => setChainID(suggestion)} 
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
