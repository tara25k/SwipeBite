import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import SwipeCard from './SwipeCard'
import {processData} from './APIService'



function App() {
  const [restaurantData, setRestaurantData] = useState([]);

  // get restaurant data and set state
  useEffect(() => {
    const fetchData = async () => {
      const data = await processData();
      setRestaurantData(data); 
    };
    fetchData();
  }, []);


  return (
    <div>
      <SwipeCard
      restaurantData={restaurantData}
      setRestaurantData={setRestaurantData}
      />
    </div>
  );
}

export default App;
