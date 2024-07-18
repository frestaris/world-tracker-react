import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <p
        className="text-center text-body-secondary m-1"
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.open(
            "https://github.com/frestaris",
            "_blank",
            "noopener noreferrer"
          );
        }}
      >
        © {currentYear} Aris <i className="bi bi-github"></i>
      </p>
    </div>
  );
};

export default Footer;
