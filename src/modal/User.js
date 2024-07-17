import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Badge, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const User = ({ selectedUser, color, countries: selectedUserCountries }) => {
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
  }, [selectedUser]);

  useEffect(() => {
    // Update countries when selectedUserCountries change
    setCountries(selectedUserCountries);
  }, [selectedUserCountries]);

  const handleDeleteCountry = (countryToDelete) => {
    const updatedCountries = countries.filter(
      (country) => country !== countryToDelete
    );
    updateLocalStorageCountries(selectedUser, updatedCountries);
    setCountries(updatedCountries);
    message.success(`${countryToDelete} deleted successfully.`);
  };

  const updateLocalStorageCountries = (userName, updatedCountries) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.name === userName ? { ...user, countries: updatedCountries } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

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
              <li key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="ps-2">{country}</div>
                  <div>
                    <DeleteOutlined
                      className="pe-3 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteCountry(country)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default User;
