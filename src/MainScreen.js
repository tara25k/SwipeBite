import React from 'react';
import './App.css';
import SwipeCard from './SwipeCard'
import NavBar from './NavBar';



function MainScreen({restaurantData, setRestaurantData, savedRestaurants, setSavedRestaurants,
                      swipedRestaurants, setSwipedRestaurants, visibleRestaurants, setVisibleRestaurants,
                    currentIndex, setCurrentIndex, setFetchedData, setPostcode, isDeckEmpty, setIsDeckEmpty}) {

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
      setFetchedData={setFetchedData}
      setPostcode={setPostcode}
      isDeckEmpty={isDeckEmpty}
      setIsDeckEmpty={setIsDeckEmpty}
      />
    </div>
  );
}

export default MainScreen;
