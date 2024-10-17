import React, { useState, useEffect } from "react";

function UpdateChainIDModal({ chainData, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    newChainID: "",
    nodeName: "",
    rpcUrl: "",
    subnetChainId: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen && chainData) {
      setFormData({
        newChainID: chainData?.chain_id || "",
        nodeName: chainData?.nodeName || "",
        rpcUrl: chainData?.rpcUrl || "",
        subnetChainId: chainData?.subnetChainId || "",
      });
      setMessage("");
    }
  }, [isOpen, chainData]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        newChainID: "",
        nodeName: "",
        rpcUrl: "",
        subnetChainId: "",
      });
      setMessage("");
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "newChainID" || name === "subnetChainId"
          ? value
            ? parseInt(value, 10)
            : ""
          : value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await onSave(
        chainData.chain_id,
        formData.newChainID,
        formData.nodeName,
        formData.rpcUrl,
        formData.subnetChainId
      );
      if (response?.message) {
        setMessage(response.message);
      } else {
        setMessage("Update successful");
      }
    } catch (error) {
      setMessage("Error saving ChainID");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update ChainID: {formData.newChainID || "N/A"}</h2>
        <label>ChainID:</label>
        <input
          type="text"
          name="newChainID"
          value={formData.newChainID}
          onChange={handleChange}
        />
        <label>Node Name:</label>
        <input
          type="text"
          name="nodeName"
          value={formData.nodeName}
          onChange={handleChange}
        />
        <label>RPC Url:</label>
        <input
          type="text"
          name="rpcUrl"
          value={formData.rpcUrl}
          onChange={handleChange}
        />
        <label>Subnet ChainID:</label>
        <input
          type="text"
          name="subnetChainId"
          value={formData.subnetChainId}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
        {message && (
          <div>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateChainIDModal;
