import React, { useState, useEffect } from 'react';
import './App.css';
import {getRestaurantData, getCuisines, processData} from './APIService'
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
  const [postcode, setPostcode] = useState('')
  const [swipedRestaurants, setSwipedRestaurants] = useState([])
  const [visibleRestaurants, setVisibleRestaurants] = useState([])
  const [currentIndex, setCurrentIndex] = useState(restaurants.length - 1)
  const [sortByRating, setSortByRating] = useState(true)
  const [fetchedData, setFetchedData] = useState(false)
  const [isDeckEmpty, setIsDeckEmpty] = useState(false);

   // get restaurant data and set state
  useEffect(() => {
    const fetchData = async () => {
      if (postcode != '') {
        const rawRestaurantData = await getRestaurantData(postcode)
        setFetchedData(true)
        setIsDeckEmpty(false)
      
        const cuisines = await getCuisines(rawRestaurantData);
        setCuisines(cuisines)


          const data = await processData(sortByRating, selectedMinRating, selectedCuisines, rawRestaurantData);
          setRestaurantData(data);
          setCurrentIndex(restaurants.length - 1)
      }


    };
    fetchData();
  }, [sortByRating, selectedMinRating, selectedCuisines, postcode]);

  const cuisineOptions = cuisines.map(cuisine => ({
    value: cuisine,
    label: cuisine
  }));

  // set the cuisines when selected
  const handleCuisineSelect = (selected) => {
    const selectedValues = selected.map(option => option.value);
    setSelectedCuisines(selectedValues);

  }

  const handlePostCodeInput = (event) => {
    // very clunky postcode checks - could make these more robust
    let postcode = event.target.value;

    postcode = postcode.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, ''); // remove any spaces and non-alphanumeric characters

    if (postcode.length > 7) {
      postcode = postcode.slice(0, 7); // only take first 7 characters
    }

    setPostcode(postcode);
  }


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to SwipeBite!</h1>

              <div class="information">
                <p>Enter a postcode, optionally set some filters, and we'll show you 10 restaurants in your area!</p>
                <p>You can either save or reject a restaurant, and see all of your saved restaurants by clicking the "Saved Restaurant" button.</p>
                <p>We'll show you the rating, address and a list of cuisines for that restaurant. You can scroll through the cuisines box to see more!</p>
              </div>

              <label htmlFor="postcodeInput">Enter PostCode: </label>
              <input
                type="text"
                id="postcodeInput"

                onChange={handlePostCodeInput}
              />

            <div className="filtersContainer">
                <div className="inputGroup">
                  <label htmlFor="sortBy">Sort By:</label>
                  <select
                    id="sortBy"
                    value={sortByRating}
                    onChange={(e) => setSortByRating(e.target.value === "true")}
                    className="filterSelect"
                  >
                    <option value={true}>Highest Rated</option>
                    <option value={false}>Most Reviewed</option>
                  </select>
                </div>

                <div className="inputGroup">
                  <label htmlFor="ratingSelect">Min Rating:</label>
                  <select
                    id="ratingSelect"
                    value={selectedMinRating}
                    onChange={(e) => setSelectedMinRating(Number(e.target.value))}
                    className="filterSelect"
                  >
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="inputGroup">
                  <label htmlFor="cuisineSelect">Cuisines:</label>
                  <Select
                    id="cuisineSelect"
                    options={cuisineOptions}
                    isMulti={true}
                    onChange={handleCuisineSelect}
                    className="filterSelect"
                  />
                </div>
              </div>
              
              <div class='row'>
                <div className="buttons">
                  <Link to="/main">
                    <button
                      id={!fetchedData ? "disabledButton":"swipeButton"}
                      disabled={!fetchedData}  // Disable button if postcode is empty
                    >Start Swiping</button>
                </Link>
                </div>
                <div className="buttons">
                  <Link to="/saved">
                    <button
                    >Saved Restaurants</button>
                </Link>
                </div>
              </div>
              {!fetchedData && (
                <p style={{color: 'red', fontSize:'20px'}}>Please Enter a PostCode...</p>
              )}

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
              swipedRestaurants={swipedRestaurants}
              setSwipedRestaurants={setSwipedRestaurants}
              visibleRestaurants={visibleRestaurants}
              setVisibleRestaurants={setVisibleRestaurants}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setFetchedData={setFetchedData}
              isDeckEmpty={isDeckEmpty}
              setIsDeckEmpty={setIsDeckEmpty}
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
