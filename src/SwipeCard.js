import React, { useState, useMemo, useRef, useEffect} from 'react'
import TinderCard from 'react-tinder-card'



function SwipeCard ({restaurantData, setRestaurantData, savedRestaurants, setSavedRestaurants, }) {
  const [currentIndex, setCurrentIndex] = useState(restaurantData.length)
  const [lastDirection, setLastDirection] = useState()
  
  

  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(restaurantData.length)
        .fill(0)
        .map((i) => React.createRef()),
    [restaurantData]
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  // useEffect to set currentIndex to restaurantData length when data is loaded in
  // (to account for occasional delay in loading data)
  useEffect(() => {
    updateCurrentIndex(restaurantData.length - 1)
  }, [restaurantData]);

  const canGoBack = currentIndex < restaurantData.length - 1
  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, restaurant, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)

    // if swiped left (i.e. saved), add restaurant to saved restaurants
    if (direction == 'left') {
      setSavedRestaurants((prev) => [...prev, restaurant])
    }
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < restaurantData.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)

    // if last restaurant was saved, undo the save
    const restoredRestaurant = restaurantData[newIndex]; // get last restaurant
    setSavedRestaurants((prev) => prev.filter((r) => r.name !== restoredRestaurant.name)); // removed from savedRestaurants if it was there

    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <div className='cardContainer'>
        {restaurantData.map((restaurant, index) => (
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