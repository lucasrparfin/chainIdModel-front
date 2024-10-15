import React, { useState } from 'react';
import FormChainID from '../components/FormChainID';
import Header from '../components/Header';
import '../App.css';

function ChainIDPage() {
  const [chainID, setChainID] = useState('');
  const [response, setResponse] = useState(null);

  const handleInputChange = (e) => {
    setChainID(e.target.value);
  };

  return (
    <div>
      <Header />
      
      <h1>ChainID Validation and Registration</h1>
      <FormChainID 
        chainID={chainID} 
        onInputChange={handleInputChange} 
        setResponse={setResponse} 
        response={response} 
        setChainID={setChainID}
      />
    </div>
  );
}

export default ChainIDPage;
