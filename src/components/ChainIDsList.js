import React, { useState, useEffect } from "react";
import {
  getAllChainIDs,
  deleteChainID,
  updateChainID,
  getUserChainIDs,
} from "../services/api";
import GenericButton from "./GenericButton";
import Table from "./Table";
import Header from "./Header";
import UpdateChainIDModal from "./UpdateChainIDModal";
import { getUserInfoFromToken } from "../utils/authUtils";

function ChainIDsList({ filter }) {
  const [chainIds, setChainIds] = useState([]);
  const [filteredChainIds, setFilteredChainIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChainID, setSelectedChainID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = getUserInfoFromToken().role;

  useEffect(() => {
    fetchChainIDs();
  }, []);

  async function fetchChainIDs() {
    try {
      let response;
      if (filter === "all" && role === "admin") {
        response = await getAllChainIDs();
      } else {
        response = await getUserChainIDs();
      }

      setChainIds(response);
      setFilteredChainIds(response);
    } catch (err) {
      setError("Failed to fetch ChainIDs");
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (chainID) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ChainID ${chainID}?`
    );
    if (confirmation) {
      try {
        await deleteChainID(chainID);
        fetchChainIDs();
      } catch (err) {
        setError("Failed to delete ChainID");
      }
    }
  };

  const handleUpdate = async (chainID, newChainID, nodeName, rpcUrl, subnetChainId) => {
    const response = await updateChainID(chainID, newChainID, nodeName, rpcUrl, subnetChainId);
    if (response.valid !== false) {
      fetchChainIDs();
    }
    return response;
  };

  const openUpdateModal = (chainId) => {
    setSelectedChainID(chainId);
    setIsModalOpen(true);
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredData = chainIds.filter(
      (chainId) =>
        chainId.chain_id.toString().includes(searchValue) ||
        chainId.nodeName.toLowerCase().includes(searchValue) ||
        chainId.rpcUrl.toLowerCase().includes(searchValue) ||
        (chainId.subnet &&
          chainId.subnet.chain_id.toString().includes(searchValue)) ||
        chainId.user.username.toLowerCase().includes(searchValue)
    );

    setFilteredChainIds(filteredData);
  };

  const columns = [
    "chain_id",
    "nodeName",
    "rpcUrl",
    "subnetChainId",
    "user.username",
  ];
  const columnTitles = {
    chain_id: "Chain ID",
    nodeName: "Node Name",
    rpcUrl: "RPC URL",
    subnetChainId: "Subnet Chain ID",
    "user.username": "Username",
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const formattedData = filteredChainIds.map((chainId) => ({
    chain_id: chainId.chain_id,
    nodeName: chainId.nodeName,
    rpcUrl: chainId.rpcUrl,
    subnetChainId: chainId.subnet ? chainId.subnet.chain_id : "N/A",
    "user.username": chainId.user.username,
  }));

  return (
    <div>
      <Header />
      <h1>{filter === "all" ? "All ChainIDs" : "Your ChainIDs"}</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleFilter}
        placeholder="Search by ChainID or Username"
      />
      {filteredChainIds.length > 0 ? (
        <Table
          data={formattedData}
          columns={columns}
          columnTitles={columnTitles}
          renderButton={(row) => (
            <>
              <GenericButton
                onClick={() => handleDelete(row.chain_id)}
                disabled={false}
                label="Delete"
              />
              <GenericButton
                onClick={() => openUpdateModal(chainIds.find(c => c.chain_id === row.chain_id))}  // Passar o objeto completo para a modal
                disabled={false}
                label="Update"
              />
            </>
          )}
        />
      ) : (
        <p>No ChainIDs found</p>
      )}

      {selectedChainID && (
        <UpdateChainIDModal
          chainData={selectedChainID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default ChainIDsList;