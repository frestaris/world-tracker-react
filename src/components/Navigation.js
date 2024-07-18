import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { SettingOutlined } from "@ant-design/icons";
import { message } from "antd";

import AddMember from "../modal/AddMember";
import EditMember from "../modal/EditMember";
import DeleteMember from "../modal/DeleteMember";
import SwitchMember from "../modal/SwitchMember";
import User from "../modal/User";

import { countriesData } from "../data";
import globe from "../globe.png";

const Navigation = () => {
  const location = useLocation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserColor, setSelectedUserColor] = useState("");
  const [selectedUserCountries, setSelectedUserCountries] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [countryToAdd, setCountryToAdd] = useState("");
  const [modalAction, setModalAction] = useState("add");
  const [mapKey, setMapKey] = useState(0); // Key to force re-render of SVG map

  useEffect(() => {
    // Function to retrieve and set user data from localStorage
    const fetchUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem("selectedUser"));
      if (storedUser && window.location.pathname === `/${storedUser.user}`) {
        setSelectedUser(storedUser.user);
        setSelectedUserColor(storedUser.color);
        setSelectedUserCountries(storedUser.countries);
      }
    };

    // Call the function once initially
    fetchUserData();

    // Add event listener to handle refresh and back/forward navigation
    const handleStorageChange = () => {
      fetchUserData();
    };

    // Subscribe to storage change events
    window.addEventListener("storage", handleStorageChange);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Dependency array empty to run only once on mount

  useEffect(() => {
    // Save user data to localStorage whenever it changes
    localStorage.setItem(
      "selectedUser",
      JSON.stringify({
        user: selectedUser,
        color: selectedUserColor,
        countries: selectedUserCountries,
      })
    );
  }, [selectedUser, selectedUserColor, selectedUserCountries]); // Update localStorage on changes

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
    if (selectedUserCountries.includes(title)) {
      setCountryToAdd(title);
      setModalAction("remove");
      setShowConfirmation(true);
    } else {
      setCountryToAdd(title);
      setModalAction("add");
      setShowConfirmation(true);
    }
  };

  const handleConfirmAction = () => {
    if (modalAction === "add") {
      addCountryToUser();
    } else if (modalAction === "remove") {
      handleDeleteCountry(countryToAdd);
    }
    setShowConfirmation(false);
  };

  const addCountryToUser = () => {
    const updatedCountries = [...selectedUserCountries, countryToAdd];
    setSelectedUserCountries(updatedCountries);
    updateLocalStorageCountries(selectedUser, updatedCountries);
    message.success(`${countryToAdd} added successfully.`);
    // Force re-render of SVG map by updating the key
    setMapKey(mapKey + 1);
  };

  const handleDeleteCountry = (countryToDelete) => {
    const updatedCountries = selectedUserCountries.filter(
      (country) => country !== countryToDelete
    );
    setSelectedUserCountries(updatedCountries);
    updateLocalStorageCountries(selectedUser, updatedCountries);
    message.success(`${countryToDelete} removed successfully.`);
    // Force re-render of SVG map by updating the key
    setMapKey(mapKey + 1);
  };

  const updateLocalStorageCountries = (userName, updatedCountries) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((user) =>
      user.name === userName ? { ...user, countries: updatedCountries } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const getCountryStyle = (title) => {
    // Check if the country belongs to the selected user
    return selectedUserCountries.includes(title)
      ? { fill: selectedUserColor, cursor: "pointer" }
      : { cursor: "pointer" };
  };

  const isUserActive = selectedUser !== null && location.pathname !== "/";

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <img
            src={globe}
            alt="Globe"
            className="d-inline-block align-top"
            style={{ height: "30px", marginRight: "10px" }}
          />
          <Navbar.Brand href="/">World Tracker</Navbar.Brand>
          {selectedUser ? (
            <User
              selectedUser={selectedUser}
              color={selectedUserColor}
              countries={selectedUserCountries}
              onUpdateCountries={setSelectedUserCountries} // Pass the setter function
              onUpdateUser={handleUpdateUser}
            />
          ) : (
            <div className="text-muted">
              | Create a Member to Start your Journey... |
            </div>
          )}
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
                {/* Display EditMember option */}
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  disabled={
                    !localStorage.getItem("users") ||
                    JSON.parse(localStorage.getItem("users")).length === 0
                  }
                >
                  <EditMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                {/* Display SwitchMember option */}
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  disabled={
                    !localStorage.getItem("users") ||
                    JSON.parse(localStorage.getItem("users")).length === 0
                  }
                >
                  <SwitchMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {/* Display DeleteMember option */}
                <NavDropdown.Item
                  style={{ backgroundColor: "transparent", color: "#000" }}
                  disabled={
                    !localStorage.getItem("users") ||
                    JSON.parse(localStorage.getItem("users")).length === 0
                  }
                >
                  <DeleteMember onSelectUser={handleSelectUser} />
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <svg
        className="ag-canvas_svg"
        key={mapKey} // Key to force re-render of SVG map
        version="1.1"
        viewBox="0 0 1008 651"
      >
        {countriesData.map((country) => (
          <path
            key={country.id}
            id={country.id}
            title={country.title}
            d={country.d}
            onClick={isUserActive ? () => handleClick(country.title) : null}
            style={getCountryStyle(country.title)}
          />
        ))}
      </svg>

      {/* Confirmation Modal */}
      <Modal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "add"
              ? "Add Country Confirmation"
              : "Remove Country Confirmation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalAction === "add" ? (
            <span>
              Do you want to add <b>{countryToAdd}</b> to your country list?
            </span>
          ) : (
            <span>
              Do you want to remove <b>{countryToAdd}</b> from your country
              list?
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant={modalAction === "add" ? "success" : "danger"}
            onClick={handleConfirmAction}
          >
            {modalAction === "add" ? "Add" : "Remove"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Navigation;
