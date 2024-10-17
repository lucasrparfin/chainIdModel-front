import React from "react";
import ChainIDsList from "../components/ChainIDsList";

function UserChainIDsPage() {
  return <ChainIDsList filter="loggedUser" />;
}

export default UserChainIDsPage;
