import React, { useState, useEffect } from 'react';
import './App.css';
import {getCuisines, processData} from './APIService'
import MainScreen from './MainScreen'
import SavedRestaurantsScreen from './SavedRestaurantsScreen'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Select from 'react-select'

function App() {
  const [restaurants, setRestaurantData] = useState([]);
  const [savedRestaurants, setSavedRestaurants] = useState([]); 
  const [selectedMinRating, setSelectedMinRating] = useState(3);
  const [cuisines, setCuisines] = useState([]); // list of all cuisines
  const [selectedCuisines, setSelectedCuisines] = useState([]) // list of chosen cuisine in dropdown list

   // get restaurant data and set state
  useEffect(() => {
    const fetchData = async () => {
      
      const cuisines = await getCuisines();
      setCuisines(cuisines)

      const data = await processData(selectedMinRating, selectedCuisines);
      setRestaurantData(data);
    };

    fetchData();
  }, [selectedMinRating, selectedCuisines]);

  const cuisineOptions = cuisines.map(cuisine => ({
    value: cuisine,
    label: cuisine
  }));

  // set the cuisines when selected
  const handleCuisineSelect = (selected) => {
    const selectedValues = selected.map(option => option.value);
    setSelectedCuisines(selectedValues);

  }


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to Restaurant Finder!</h1>

              <label htmlFor="ratingSelect">Select Minimum Rating: </label>
              <select
                id="ratingSelect"
                value={selectedMinRating}
                onChange={(e) => setSelectedMinRating(Number(e.target.value))} 
              >
                <option value={1}>1 Star</option>
                <option value={2}>2 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={5}>5 Stars</option>
              </select>

              <label htmlFor="cuisineSelect">Select Cuisines: </label>

              <Select 
              id="cuisineSelect"
                options={cuisineOptions} 
                isMulti={true}
                onChange={handleCuisineSelect}
              />

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
