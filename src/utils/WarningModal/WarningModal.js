import React from 'react';

function Modal({ children }) {
  return (
    <div className="modal">
      <div className="container">
        <div>
          <h2>{children}</h2>
        </div>
      </div>
    </div>
  );
}
export default Modal;
