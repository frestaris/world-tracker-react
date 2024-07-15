// import React, { useState, useEffect } from "react";
// import { Dropdown } from "react-bootstrap";

// const User = ({ selectedUser, color, onUpdateUser }) => {
//   const [countries, setCountries] = useState([]);

//   const loadUserCountries = () => {
//     if (selectedUser) {
//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const user = users.find((user) => user.name === selectedUser);
//       if (user && user.countries) {
//         setCountries(user.countries);
//       } else {
//         setCountries([]);
//       }
//     }
//   };

//   useEffect(() => {
//     loadUserCountries();
//   }, [selectedUser, onUpdateUser]);

//   const userStyle = {
//     backgroundColor: color,
//     padding: "5px 10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   };

//   return (
//     <div>
//       {selectedUser ? (
//         <Dropdown>
//           <Dropdown.Toggle style={userStyle} id="dropdown-basic" as="span">
//             {selectedUser}
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {countries.map((country, index) => (
//               <Dropdown.Item key={index}>{country}</Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//       ) : null}
//     </div>
//   );
// };

// export default User;

import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

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
    backgroundColor: color,
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      {selectedUser ? (
        <Dropdown>
          <Dropdown.Toggle style={userStyle} id="dropdown-basic" as="span">
            {selectedUser}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {countries.map((country, index) => (
              <Dropdown.Item key={index}>{country}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
    </div>
  );
};

export default User;
