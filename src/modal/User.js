import React from "react";

const User = ({ selectedUser, color }) => {
  const userStyle = {
    backgroundColor: color,
    padding: "5px 10px",
    borderRadius: "5px",
  };

  return (
    <>{selectedUser ? <span style={userStyle}>{selectedUser}</span> : null}</>
  );
};

export default User;
