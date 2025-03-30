import React from 'react';
import './App.css';
import SwipeCard from './SwipeCard'
import NavBar from './NavBar';



function MainScreen({restaurantData, setRestaurantData, savedRestaurants, setSavedRestaurants}) {

  return (
    <div>
      <NavBar />
      <SwipeCard
      restaurantData={restaurantData}
      setRestaurantData={setRestaurantData}
      savedRestaurants={savedRestaurants}
      setSavedRestaurants={setSavedRestaurants}
      />
    </div>
  );
}

export default MainScreen;
