import React, { useState, useEffect } from 'react';
import { getAllChainIDs, deleteChainID } from '../services/api';
import GenericButton from '../components/GenericButton';
import Table from '../components/Table';
import Header from '../components/Header';

import '../App.css';

function AllChainIDsPage() {
  const [chainIds, setChainIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchChainIDs();
  }, []);

  async function fetchChainIDs() {
    try {
      const response = await getAllChainIDs();
      setChainIds(response);
    } catch (err) {
      setError('Failed to fetch ChainIDs');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (chainID) => {
    const confirmation = window.confirm(`Are you sure you want to delete ChainID ${chainID}?`);
    if (confirmation) {
      try {
        await deleteChainID(chainID);
        fetchChainIDs();  // Atualiza a lista após deletar
      } catch (err) {
        setError('Failed to delete ChainID');
      }
    }
  };

  const columns = ['chain_id', 'user.username'];
  const columnTitles = {
    'chain_id': 'Chain ID',
    'user.username': 'Username'
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formattedData = chainIds.map((chainId) => ({
    'chain_id': chainId.chain_id,
    'user.username': chainId.user.username
  }));

  return (
    <div>
    <Header />
      <h1>All ChainIDs</h1>
      {chainIds.length > 0 ? (
        <Table 
          data={formattedData} 
          columns={columns} 
          columnTitles={columnTitles} 
          renderButton={(row) => (
            <GenericButton
              onClick={() => handleDelete(row.chain_id)}
              disabled={false}
              label="Delete"
            />
          )}
        />
      ) : (
        <p>No ChainIDs found</p>
      )}
    </div>
  );
}

export default AllChainIDsPage;
