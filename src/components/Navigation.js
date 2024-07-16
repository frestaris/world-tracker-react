import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { SettingOutlined } from "@ant-design/icons";

import AddMember from "../modal/AddMember";
import EditMember from "../modal/EditMember";
import DeleteMember from "../modal/DeleteMember";
import SwitchMember from "../modal/SwitchMember";
import User from "../modal/User";

import { countriesData } from "../data";

const Navigation = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserColor, setSelectedUserColor] = useState("");
  const [selectedUserCountries, setSelectedUserCountries] = useState([]);

  const handleSelectUser = (user, color, countries) => {
    setSelectedUser(user);
    setSelectedUserColor(color);
    setSelectedUserCountries(countries);
  };

  const handleClick = (title) => {
    console.log("Clicked country:", title);
    console.log("Selected User:", selectedUser);
    console.log("User Color:", selectedUserColor);
    console.log("User Countries:", selectedUserCountries);
    // Perform additional logic if needed
  };

  const getCountryStyle = (title) => {
    // Check if the country belongs to the selected user
    return selectedUserCountries.includes(title)
      ? { fill: selectedUserColor, cursor: "pointer" }
      : { cursor: "pointer" }; // Default color for other countries
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <Navbar.Brand href="/">World Tracker</Navbar.Brand>
          <User
            selectedUser={selectedUser}
            color={selectedUserColor}
            countries={selectedUserCountries}
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  <>
                    <SettingOutlined /> Dashboard{" "}
                  </>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <AddMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <EditMember
                    onSelectUser={handleSelectUser}
                    // onUpdateUser={handleUpdateUser}
                  />
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <SwitchMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <DeleteMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <svg className="ag-canvas_svg" version="1.1" viewBox="0 0 1008 651">
        {countriesData.map((country) => (
          <path
            key={country.id}
            id={country.id}
            title={country.title}
            d={country.d}
            onClick={() => handleClick(country.title)}
            style={getCountryStyle(country.title)}
          />
        ))}
      </svg>
    </div>
  );
};

export default Navigation;
