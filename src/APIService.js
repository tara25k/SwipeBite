export const getRestaurantData = async () => {
    const postcode = 'EC4M7RF'; // temporarily pass in postcode - later pass in as argument?
    const url = `https://proxy.corsfix.com/?https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;

    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) throw new Error(`Status Error: ${response.status}`);

        const responseData = await response.json();

        return responseData;

    } catch (error) {
        console.error("Error fetching restaurant data:", error);
        return null;
    }
};


export const processData = async (minRating, selectedCuisines) => {
    const restaurantData = await getRestaurantData();
  
    // format restaurant data into array of objects with relevant information
    const restaurants = restaurantData.restaurants
      .map((restaurant) => ({
        name: restaurant.name, 
        rating: restaurant.rating.count > 0 ? restaurant.rating.starRating : "No reviews", // to not misrepresent restaurants with no reviews as bad
        cuisines: restaurant.cuisines.map((cuisine) => cuisine.name), 
        city: restaurant.address.city,
        firstLine: restaurant.address.firstLine,
      }))
      .filter((restaurant) => {
        return typeof restaurant.rating === "number" && restaurant.rating >= minRating;
      })
      .filter((restaurant) => {
        if (selectedCuisines.length === 0) {
          return true; // if no cuisines are selected, return all restaurants
        }
        return selectedCuisines.some(cuisine => restaurant.cuisines.includes(cuisine));
      });

    const slicedData = restaurants.slice(0, 11) // get first 10 objects
  
    return slicedData;
  }

export const getCuisines = async () => {
    const restaurantData = await getRestaurantData();

    const allCuisines = []; // stores names of all cuisines
    
    // add each cuisine to list
    for (const restaurant of restaurantData.restaurants) {
        if (restaurant.cuisines && Array.isArray(restaurant.cuisines)) {
          for (const cuisine of restaurant.cuisines) {
            if (!allCuisines.includes(cuisine.name)) { // to ensure no duplicates
              allCuisines.push(cuisine.name);
            }
          }
        } else {
          console.log("no cuisines found for restaurant:", restaurant.name); // for error debugging
        }
      }

    
    return allCuisines;
  };
  