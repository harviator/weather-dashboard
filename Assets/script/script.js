//OpenWeather API KEY: aef0b3e494e18420468bba6b1a3ed89b
var openWxAPIKey = "aef0b3e494e18420468bba6b1a3ed89b";
//Search Button
var searchBtn = document.getElementById('searchBtn');

//Function to get wx
function getWx(event) {

    //Prevents the page from reloading when the submit button is clicked
    event.preventDefault();

    //Variable to collect user input for the city name and store it
    var city = document.getElementById('search').value;

    console.log(city);

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


searchBtn.addEventListener('click', getWx);

/*
Notes:
1. Create a form input to search for city wx.
2. The current api returns the current wx.  I also need the 5 day (I think they offer 7 day).
    The current wx must include:
        -The city name
        -The date (probs going to need moment.js to get use unix)
        -Icon representing the wx conditions
        -Temp
        -Humidity
        -Wnd spd
        -UV index (color coded)
3. 5 Day forecast:
    -Date
    -Icon representing wx conditions
    -Temp
    -Wind spd
    -Humidity
4. City Search History
    -When clicked gets the wx again
*/