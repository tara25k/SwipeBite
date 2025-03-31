import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav>
       <div className='buttons'>
      <button style={{backgroundColor: '#689c09'}}onClick={() => navigate("/saved")}>Saved Restaurants</button>
      </div>
    </nav>
  );
}

export default NavBar;
