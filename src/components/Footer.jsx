import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Octavio Alcober ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
