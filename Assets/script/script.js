//OpenWeather API KEY: aef0b3e494e18420468bba6b1a3ed89b

var openWxAPIKey = "aef0b3e494e18420468bba6b1a3ed89b";

//Variable to collect user input for the city name and store it
var city;

city = 'Toronto';



//Fetch function
function getWx() {

    //Variable for search query
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWxAPIKey}`;
    console.log(queryURL);

    fetch(queryURL)
        .then(function (data) {
            return data.json();
        })
        .then (function (parsedData) {
            console.log(parsedData);
        });
}

getWx();


/*
Notes:
1. Still need to create input to get user name for fetch to work.
*/