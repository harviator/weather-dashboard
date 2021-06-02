//OpenWeather API KEY: aef0b3e494e18420468bba6b1a3ed89b
var openWxAPIKey = "aef0b3e494e18420468bba6b1a3ed89b";
//Search Button
var searchBtn = document.getElementById('searchBtn');
//Search History
var searchHistory = JSON.parse(localStorage.getItem("cities")) || [];
//Current Weather Heading
var cityDateIcon = document.getElementById('cityDateIcon');
//Today's date
var todayDate = moment().format("YYYY/MM/D");
//Current Wx Icon
var currentWxIcon = document.getElementById('currentWxIcon');
//Current Wx List
var currentWxList = document.getElementById('currentWxList');



//Function to get wx
function getWx(event, myCity) {

    //Prevents the page from reloading when the submit button is clicked
    event.preventDefault();

    //Variable to collect user input for the city name and store it
    var city = myCity || document.getElementById('search').value;

    // Check if the searchHistory array already contains the city
    if (searchHistory.includes(city)) {

        city = myCity || document.getElementById('search').value;

    } else {

        searchHistory.push(city);
        localStorage.setItem("cities", JSON.stringify(searchHistory));
        var listEl = document.querySelector('#history').innerHTML=""
        displayHistory();

    }

    document.getElementById('search').value = '';

    //Variable for search query
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWxAPIKey}`;
    console.log(queryURL);

    fetch(queryURL)
        .then(function (data) {
            return data.json();
        })

        .then (function (parsedData) {
            console.log(parsedData);
            //clear elements
            currentWxList.innerHTML = "";


            //Icon for current wx
            var iconCrnt = parsedData.weather[0].icon;
            currentWxIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + iconCrnt + '.png');

            cityDateIcon.textContent = `Current Weather Conditions for ${parsedData.name} on ${todayDate}:`;

            var lat = parsedData.coord.lat;
            var lon = parsedData.coord.lon;
            
            var latLongURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${openWxAPIKey}`;

            fetch(latLongURL)
                .then(function (data) {
                    return data.json();
                })

                .then (function (parsedData) {
                    console.log(parsedData);

                    var itemEl1 = document.createElement('li');
                    var itemEl2 = document.createElement('li');
                    var itemEl3 = document.createElement('li');
                    var itemEl4 = document.createElement('li');

                    var temp = parsedData.current.temp;
                    var humidity = parsedData.current.humidity;
                    var wndspd = Math.round(parsedData.current.wind_speed * 3.6);
                    var uvi = parsedData.current.uvi;

                    itemEl1.textContent = `Temp: ${temp} ºC`;
                    itemEl2.textContent = `Humidity: ${humidity}%`;
                    itemEl3.textContent = `Wind: ${wndspd} km/h`;
                    itemEl4.textContent = `UV Index: ${uvi}`;

                    currentWxList.append(itemEl1);
                    currentWxList.append(itemEl2);
                    currentWxList.append(itemEl3);
                    currentWxList.append(itemEl4);

                    console.log(temp);



                })
            //getCoords(parsedData.coords.lat,parsedData.coords.lon)


            //parsedData.coords.lat
            //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
            //fetch(latlonURL).then(data).then(parsedData)
            
                
        });

}

//getCoords(lat,lon){
    //parsedData.coords.lat
            //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
            //fetch(latlonURL).then(data).then(parsedData)
//

//Search History Display
function displayHistory() {
    //

    for (let index = 0; index < searchHistory.length; index++) {
        
        var listEl = document.getElementById('history');
        var cityList = document.createElement('li');
        var button = document.createElement('button');

        button.setAttribute('class', 'btn btn-primary btn-sm mt-1');
        button.textContent = searchHistory[index];

        listEl.append(cityList);
        cityList.append(button);

        button.addEventListener('click', function(e) {
            getWx(e, searchHistory[index])
        })
        
    }

}

displayHistory();

//Display Current Weather
// function displayCurrentWx() {

// }




searchBtn.addEventListener('click', getWx);

/*
Notes:
1. Create a form input to search for city wx - Done
2. The current api returns the current wx.
    The current wx must include:
        -The city name - Done
        -The date (probs going to need moment.js to get use unix) - Done
        -Icon representing the wx conditions - Done
        -Temp - Done
        -Humidity - Done
        -Wnd spd - Done
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