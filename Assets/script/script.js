//OpenWeather API KEY: aef0b3e494e18420468bba6b1a3ed89b

var openWxAPIKey = "aef0b3e494e18420468bba6b1a3ed89b";

//Variable to collect user input for the city name and store it
var city;

//Variable for search query
var queryURL = `api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWxAPIKey}`; //http? can concatenate city and API Key if it doesn't work this way

//Fetch
fetch(queryURL)

/*
Notes:
1. Still need to create input to get user name for fetch to work.
*/