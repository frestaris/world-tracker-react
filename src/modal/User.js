import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Badge } from "antd";

const User = ({ selectedUser, color, onUpdateUser }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadUserCountries = () => {
      if (selectedUser) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user) => user.name === selectedUser);
        if (user && user.countries) {
          setCountries(user.countries);
        } else {
          setCountries([]);
        }
      }
    };

    loadUserCountries();
  }, [selectedUser, onUpdateUser]);

  const userStyle = {
    color: "white",
    backgroundColor: color,
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const badgeStyle = {
    backgroundColor: "#0F67B1",
    color: "#fff",
  };

  return (
    <div>
      {selectedUser ? (
        <Dropdown>
          <Dropdown.Toggle style={userStyle} id="dropdown-basic" as="span">
            <Badge
              count={countries.length}
              offset={[23, -8]}
              style={badgeStyle}
            >
              <span style={userStyle}>{selectedUser}</span>
            </Badge>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
            {countries.map((country, index) => (
              <li className="p-1" key={index}>
                {country}
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default User;
