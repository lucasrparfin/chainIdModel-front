import React, { useState } from 'react';
import FormChainID from '../components/FormChainID';
import Header from '../components/Header';
import '../App.css';

function ChainIDPage() {
  const [response, setResponse] = useState(null);

  return (
    <div>
      <Header />
      <h1>ChainID Validation and Registration</h1>
      <FormChainID 
        setResponse={setResponse} 
        response={response} 
      />
    </div>
  );
}

export default ChainIDPage;
