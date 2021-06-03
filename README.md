# Weather Dashboard

## Background

This is a homework assignment for the UofT Bootcamp.  Below is the user story and acceptance criteria for reference

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Process

* For this assignment we weren't given any starter code, so the site is built from scratch.  I started with a basic html page with a linked JS file, so I could view the console.
* My first goal within the JS file was to get the API key and use fetch to see what data I recieved from a call that allowed "city" as part of the query.  It was discovered that while I recieved most of the current weather from a call that had the city as part of the search query, it did not contain the UV index value or forecast value.  The initial call with city as a query did contain latitude an longitute, which was used in a subsequent call to get the missing UV index and forecast data.
* With the data coming through in the console I made a layout in the HTML file using Bootstrap.  Once this was created I finished up on the JS side of things which included a lot of of DOM traversal.  I wrapped it all up with minor changes on using Bootstrap and CSS.
* Some of the challenges with this assignment included getting use to fetch and working with the parsed data to get what I wanted, getting the search history to display properly without duplicate entries in the local storage, and small things such as figuring out how to get the icons to display.  A feature I'd like to include in the future is a button to clear the search results.
* Credit to the TA's, my tutor, and classmates Jugraj and Daryl for helping me with this assignment.

## Screen Shot

![Getting Started](./Assets/imgaes/screen-shot.png)

## Link

https://harviator.github.io/weather-dashboard/