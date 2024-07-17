import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countryToAdd, setCountryToAdd] = useState("");

  const handleSelectUser = (user, color, countries) => {
    setSelectedUser(user);
    setSelectedUserColor(color);
    setSelectedUserCountries(countries);
  };

  const handleUpdateUser = () => {
    // Trigger a re-render for the User component
    handleSelectUser(selectedUser, selectedUserColor, selectedUserCountries);
  };

  const handleClick = (title) => {
    setCountryToAdd(title);
    setShowConfirmation(true);
  };

  const addCountryToUser = () => {
    const updatedCountries = [...selectedUserCountries, countryToAdd];
    setSelectedUserCountries(updatedCountries);
    localStorage.setItem(
      "users",
      JSON.stringify(
        updateUserCountriesInLocalStorage(selectedUser, updatedCountries)
      )
    );
    setShowConfirmation(false);
  };

  const updateUserCountriesInLocalStorage = (userName, updatedCountries) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) => {
      if (user.name === userName) {
        return { ...user, countries: updatedCountries };
      }
      return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return updatedUsers;
  };

  const getCountryStyle = (title) => {
    // Check if the country belongs to the selected user
    return selectedUserCountries.includes(title)
      ? { fill: selectedUserColor, cursor: "pointer" }
      : { cursor: "pointer" };
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
            onUpdateUser={handleUpdateUser}
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
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                >
                  <AddMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                >
                  <EditMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                >
                  <SwitchMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                >
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

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Country Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to add {countryToAdd} to your country list?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={addCountryToUser}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navigation;
