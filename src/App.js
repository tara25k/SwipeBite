import React, { useState, useEffect } from 'react';
import './App.css';
import {processData} from './APIService'
import MainScreen from './MainScreen'
import SavedRestaurantsScreen from './SavedRestaurantsScreen'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [restaurants, setRestaurantData] = useState([]);
  const [savedRestaurants, setSavedRestaurants] = useState([]); 

   // get restaurant data and set state
  useEffect(() => {
    const fetchData = async () => {
      const data = await processData();
      setRestaurantData(data);
    };

    fetchData();
  }, []);


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to Restaurant Finder!</h1>

              <Link to="/main">
                <button>Start Swiping</button>
              </Link>
            </div>
          }
        />

        <Route
          path="/main"
          element={
            <MainScreen
              restaurantData={restaurants}
              setRestaurantData={setRestaurantData}
              savedRestaurants={savedRestaurants}
              setSavedRestaurants={setSavedRestaurants}
            />
          }
        />

        <Route
          path="/saved"
          element={<SavedRestaurantsScreen savedRestaurants={savedRestaurants} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
