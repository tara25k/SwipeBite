import React from "react";
import { Link } from "react-router-dom";

function SavedRestaurantsScreen({ savedRestaurants }) {
  console.log('saved restaurant screen', savedRestaurants)
  return (
    <div>
      <h2>Saved Restaurants</h2>
      {savedRestaurants.length > 0 ? (
        <ul>
          {savedRestaurants.map((restaurant, index) => (
            <li key={index}>{restaurant.name}</li>
          ))}
        </ul>
      ) : (
        <p>No saved restaurants yet.</p>
      )}
      <Link to="/main">Back to Swiping</Link>
    </div>
  );
}

export default SavedRestaurantsScreen;
