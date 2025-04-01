import React from "react";
import { useNavigate } from "react-router-dom";
import ReactScrollableList from 'react-scrollable-list'


function SavedRestaurantsScreen({ savedRestaurants }) {
  const navigate = useNavigate();
  return (
<div className="savedRestaurantsContainer">
  <h2>Saved Restaurants</h2>
  
  {savedRestaurants.length > 0 ? (
    <div className="restaurantGrid">

      {savedRestaurants.map((restaurant, index) => (

        <div key={index} className="restaurantCard">

          <h4>{restaurant.name}</h4>

          <p><b>Rating:</b> {restaurant.rating}⭐</p>
          <div style={{ 
              height: `${20 * 3}px`,
              overflowY: 'auto', 
              border: '1px solid #ccc', 
              padding: '5px',
              backgroundColor: '#ffb459',
              }}>

            <ReactScrollableList
            listItems={restaurant.cuisines.map((cuisine, index) => ({
              id: index, 
              content: cuisine 
            }))}
            heightOfItem={20}  
            maxItemsToRender={10} 
            style={{ color: '#333' }}
          />
        </div>
        
          <p id='address'><b>Address:</b> {restaurant.city}, {restaurant.firstLine}</p>
        </div>
      ))}
    </div>
  ) : (
    <p>No saved restaurants yet.</p>
  )}

  <nav>
       <div className='buttons'>
      <button style={{backgroundColor: '#689c09'}}onClick={() => navigate("/main")}>Back to Swiping</button>
      </div>
    </nav>
</div>
  );
}

export default SavedRestaurantsScreen;
