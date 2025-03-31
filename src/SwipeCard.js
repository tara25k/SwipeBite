import React, { useState, useMemo, useRef, useEffect} from 'react'
import TinderCard from 'react-tinder-card'



function SwipeCard ({restaurantData, setRestaurantData, savedRestaurants, setSavedRestaurants, 
  currentIndex, setCurrentIndex, swipedRestaurants, setSwipedRestaurants, visibleRestaurants, setVisibleRestaurants
}) {
  const currentIndexRef = useRef(currentIndex)

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

  // useEffect to set currentIndex to restaurantData length when data is loaded in
  // (to account for occasional delay in loading data)
  useEffect(() => {
    if (currentIndex == -1){
      updateCurrentIndex(restaurantData.length - 1)
    }
  }, [restaurantData]);

  useEffect(() => {
    setVisibleRestaurants(restaurantData.filter((r) => !swipedRestaurants.includes(r)));
  }, [restaurantData, swipedRestaurants])

  const canGoBack = currentIndex < restaurantData.length - 1
  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, restaurant, index) => {
    setSwipedRestaurants((prev) => [...prev, restaurant]);
    setVisibleRestaurants((prev) => prev.filter((r) => r.name !== restaurant.name))

    updateCurrentIndex(index - 1)

    // if swiped left (i.e. saved), add restaurant to saved restaurants
    if (direction == 'left') {
      setSavedRestaurants((prev) => [...prev, restaurant])
    }
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
  }

  const swipe = async (dir) => {
    const cardRef = childRefs[currentIndex]?.current;
    if (cardRef) {
      await cardRef.swipe(dir);
    } else {
      console.warn('Card reference is invalid ', currentIndex, childRefs)
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return

    const lastSwiped = swipedRestaurants[swipedRestaurants.length - 1];

    if (lastSwiped) {
      setSwipedRestaurants((prev) => prev.slice(0, -1)); 
      setVisibleRestaurants((prev) => [lastSwiped, ...prev]); 

      const newIndex = currentIndex + 1;
      updateCurrentIndex(newIndex);

      setSavedRestaurants((prev) => prev.filter((r) => r.name !== lastSwiped.name));

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
            onCardLeftScreen={() => outOfFrame(restaurant.name, index)}
          >
            <div
              style={{ backgroundColor: 'orange'}}
              className='card'
            >
              <h3>{restaurant.name}</h3> <br></br>

              <p>Rating: {restaurant.rating}</p><br></br>

              <p>Cuisines:</p>
                <ul>
                {restaurant.cuisines.map((cuisine, index) => (
                  <li key={index}>{cuisine}</li>
                ))}
              </ul>

              <p>Address: {restaurant.city}, {restaurant.firstLine}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
    </div>
  )
}

export default SwipeCard