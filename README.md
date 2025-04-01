
# WELCOME TO SWIPEBITE!

  

This is an app that loads in data from the JustEat restaurant API (given a postcode and some optional filters), and presents you with 10 restaurants in a card-swiping format.

Each time you see a restaurant card, you are presented with information about the ratings, cuisines, and location, and can choose to 'save' it for later or dismiss it.


  

Every time a restaurant is saved, it can be viewed in your "saved restaurants" page.



  

Seeing restaurants one by one is less overwhelming than seeing several options at once, and means that users are more likely to make an informed choice about where they actually want to eat!

## RUNNING THE APPLICATION
- Clone the github repository (copy link from green 'Code' button on github, navigate to the desired folder and use ``git clone https://github.com/tara25k/JET-Restaurants.git``
- ``cd`` into the project directory
- Run ``npm install --save --legacy-peer-deps``
- Run ``npm start``
- After a minute or so, the application should open in your browser!

## TASK ASSUMPTIONS
  

- I was unsure whether the postcode had to be provided by the user or not, so I had it be an input field just in case.

- I was also unsure how much of the address had to be shown, so I've only shown the first two address lines, as the postcode is the same for each restaurants, although the rest of the information could be easily added.
- I was unsure if images were necessary. Initially, I was hoping to web scrape the images given the restaurant name, however it quickly became apparent that I couldn't be sure how many of the images were free to use under copyright. Instead, I have some generic stock images of food for common cuisines (e.g. burgers, pasta etc.) but an image may not show up for every restaurant.

- I assumed that unit tests weren't necessary, but I found it handy to have some for processing the API data, so those have been included in the 'src/tests' folder.
In order to run these tests, navigating to the program directory in the terminal and using ``npm run test processData.test.js`` should be sufficient.

## FEATURES

Key features of this application include:
-  