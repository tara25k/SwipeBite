import React from 'react';
import './App.css';
import SwipeCard from './SwipeCard'
import NavBar from './NavBar';



function MainScreen({restaurantData, setRestaurantData, savedRestaurants, setSavedRestaurants,
                      swipedRestaurants, setSwipedRestaurants, visibleRestaurants, setVisibleRestaurants,
                    currentIndex, setCurrentIndex}) {

  return (
    <div>
      <NavBar />
      <SwipeCard
      restaurantData={restaurantData}
      setRestaurantData={setRestaurantData}
      savedRestaurants={savedRestaurants}
      setSavedRestaurants={setSavedRestaurants}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      swipedRestaurants={swipedRestaurants}
      setSwipedRestaurants={setSwipedRestaurants}
      visibleRestaurants={visibleRestaurants}
      setVisibleRestaurants={setVisibleRestaurants}
      />
    </div>
  );
}

export default MainScreen;
