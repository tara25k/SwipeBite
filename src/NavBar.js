import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/saved")}>Saved Restaurants</button>
    </nav>
  );
}

export default NavBar;
