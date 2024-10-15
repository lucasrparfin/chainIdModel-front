import React from 'react';

function GenericButton({ onClick, disabled, label }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default GenericButton;
