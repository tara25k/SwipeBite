
# WELCOME TO SWIPEBITE!
SwipeBite is a React application that loads in data from the JustEat restaurant API (given a postcode and some optional filters), and presents you with 10 restaurants in a card-swiping format.

Each time you see a restaurant card, you are presented with information about the ratings, cuisines, and location, and can choose to 'save' it for later or dismiss it.

Every time a restaurant is saved, it can be viewed in your "saved restaurants" page.

Seeing restaurants one by one is less overwhelming than seeing several options at once, and means that users are more likely to make an informed choice about where they actually want to eat!

## RUNNING THE APPLICATION
1. Ensure you have Node.js installed (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)n 
2. Clone the github repository into a directory you want using``https://github.com/tara25k/SwipeBite.git``
3. ``cd`` into the project directory
4. Run ``npm install --save --legacy-peer-deps``
5. Run ``npm start``
6. After a minute or so, the application should open in your browser!
(Ensure you have a consistent internet connection so it can connect to the API)

## TASK ASSUMPTIONS
- I was unsure whether the postcode had to be provided by the user or not, so I had it be an input field just in case.
- I was also unsure how much of the address had to be shown, so I've only shown the first two address lines, as the postcode is the same for each restaurants, although the rest of the information could be easily added.
- I was unsure if images were necessary. Initially, I was hoping to web scrape the images given the restaurant name, however it quickly became apparent that I couldn't be sure how many of the images were free to use under copyright. Instead, I have some generic stock images of food for common cuisines (e.g. burgers, pasta etc.) but an image may not show up for every restaurant.
- I assumed that unit tests weren't necessary, but I found it handy to have some for processing the API data, so those have been included in the 'src/tests' folder.
In order to run these tests, navigating to the program directory in the terminal and using ``npm run test processData.test.js`` should be sufficient.

## FUTURE FEATURES
If I had more time, I would have:
- Included more filters, such as a maximum ratings filter, or the ability to filter by both highest rating and most rated. Maybe even an 'exclusions' filter.
- Added a 'delete' button on the saved restaurants screen.
- Removed non-cuisines from the cuisines list, such as "two for one" or "tuesday deals", and added these to a separate section.
    - This could have been done using RegEx to search for items containing common words, such as "deal" or "coupon".
- Added relevant images for each restaurant, ensuring that each image is fair use and abides by copyright.
- Added further unit tests for the frontend, such as testing that the swiping mechanism always works and saved restaurants are always saved correctly.