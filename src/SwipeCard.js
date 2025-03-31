import React, { useState, useMemo, useRef, useEffect} from 'react'
import TinderCard from 'react-tinder-card'
import ReactScrollableList from 'react-scrollable-list'

function SwipeCard ({restaurantData, setRestaurantData, savedRestaurants, setSavedRestaurants, 
  currentIndex, setCurrentIndex, swipedRestaurants, setSwipedRestaurants, visibleRestaurants, setVisibleRestaurants
}) {
  // QUICK RUNDOWN
  // restaurantData - array of objects, one object for each restaurant
  // savedRestaurants - array of restaurant objects that the user has saved
  // swipedRestaurants - restaurants the user has already swiped past
  // visible restaurants - restaurants the user hasn't swiped past


  // currentIndex stores where we currently are in the 'restaurant cards'
  const currentIndexRef = useRef(currentIndex)
  

  // childRefs refers to the indices for each 'restaurant card'
  const childRefs = useMemo(
    () =>
      Array(visibleRestaurants.length)
        .fill(0)
        .map((i) => React.createRef()),
    [visibleRestaurants]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  // to set currentIndex to restaurantData length when data is loaded in (to account for occasional delay in loading data)
  useEffect(() => {
    if (currentIndex == -1){
      updateCurrentIndex(restaurantData.length - 1)
    }
  }, [restaurantData]);

  // makes sure visibleRestaurants only contains restaurants not swiped yet
  useEffect(() => {
    setVisibleRestaurants(restaurantData.filter((r) => !swipedRestaurants.includes(r)));
  }, [restaurantData, swipedRestaurants])

  const canGoBack = currentIndex <= restaurantData.length - 1 // if true, user can undo swipe
  const canSwipe = currentIndex >= 0 // only false when at end of deck

  // called after successful swiping action
  const swiped = (direction, restaurant, index) => {
    // update swiped and visible restaurants and current index
    setSwipedRestaurants((prev) => [...prev, restaurant]);
    setVisibleRestaurants((prev) => prev.filter((r) => r.name !== restaurant.name))

    updateCurrentIndex(index - 1)

    // if swiped left (i.e. saved), add restaurant to saved restaurants
    if (direction == 'left') {
      setSavedRestaurants((prev) => [...prev, restaurant])
    }
  }

  // on swiping to ensure correct card is being swiped
  const swipe = async (dir) => {
    const cardRef = childRefs[currentIndex]?.current;
    if (cardRef) {
      await cardRef.swipe(dir);
    } else {
      console.warn('Card reference is invalid ', currentIndex, childRefs)
    }
  }

  // called when 'undo swipe' button is clicked
  const goBack = async () => {
    if (!canGoBack) return

    // get last swiped card to display
    const lastSwiped = swipedRestaurants[swipedRestaurants.length - 1];

    if (lastSwiped) {
      // update swiped and visible restaurants
      setSwipedRestaurants((prev) => prev.slice(0, -1)); 
      setVisibleRestaurants((prev) => [lastSwiped, ...prev]); 

      const newIndex = currentIndex + 1;
      updateCurrentIndex(newIndex);

      // remove from saved restaurants if it was saved
      setSavedRestaurants((prev) => prev.filter((r) => r.name !== lastSwiped.name));

      // restore card or log warnings
      const cardRef = childRefs[newIndex]?.current; // Safely access the ref
      if (cardRef) {
        await cardRef.restoreCard();
      } else {
        console.warn('Card reference is invalid at goBack', newIndex, childRefs);
      }
    } else {
      console.warn('No swiped restaurants to go back to');
    }
  }

  return (
    <div>
      <div className='cardContainer'>
        {visibleRestaurants.map((restaurant, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={`${restaurant.name}-${index}`}
            onSwipe={(dir) => swiped(dir, restaurant, index)}
          >
            <div
              style={{ backgroundColor: 'orange'}}
              className='card'
            >
              <h3>{restaurant.name}</h3>

              <p id='rating'>Rating: {restaurant.rating}⭐</p>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <img style={{ width: '200px', height: '100px', padding:'5px'}} src={`./foodImages/${restaurant.cuisines[0]}.jpg`} alt="image" />
            </div>


              {/* <p id='cuisines'>Cuisines:</p> */}
              <div style={{ 
              height: `${90 * 3}px`, // Only enough space for 3 items
              overflowY: 'auto', // Enables scrolling
              border: '1px solid #ccc', // Optional: Visual clarity
              padding: '5px',
              backgroundColor: '#ffb459',
              }}>
              <ReactScrollableList
                listItems={restaurant.cuisines.map((cuisine, index) => ({
                  id: index, // Unique ID
                  content: cuisine // The cuisine name
                }))}
                heightOfItem={90}  
                maxItemsToRender={10} // Keep it larger than 3 to avoid cut-off behavior
                style={{ color: '#333' }}
              />
            </div>

              <p id='address'><b>Address:</b> {restaurant.city}, {restaurant.firstLine}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Save!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Nope</button>
      </div>
    </div>
  )
}

export default SwipeCard