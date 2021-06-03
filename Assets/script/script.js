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
        var listEl = document.querySelector('#history').innerHTML = ""
        displayHistory();

    }

    document.getElementById('search').value = '';

    //Variable for search query
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWxAPIKey}`;

    fetch(queryURL)
        .then(function (data) {
            return data.json();
        })

        .then(function (parsedData) {
            //Clear List Elements
            currentWxList.innerHTML = "";

            //Icon for current wx
            var iconCrnt = parsedData.weather[0].icon;
            currentWxIcon.setAttribute('src', 'https://openweathermap.org/img/w/' + iconCrnt + '.png');

            cityDateIcon.textContent = `Current Weather Conditions for ${parsedData.name} on ${todayDate}:`;

            var lat = parsedData.coord.lat;
            var lon = parsedData.coord.lon;

            var latLongURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${openWxAPIKey}`;

            //Fetch Current and Forecast Wx data using lat and long
            fetch(latLongURL)
                .then(function (data) {
                    return data.json();
                })

                .then(function (parsedData) {

                    var itemEl1 = document.createElement('li');
                    var itemEl2 = document.createElement('li');
                    var itemEl3 = document.createElement('li');
                    var itemEl4 = document.createElement('li');
                    var span = document.createElement('span');

                    var temp = Math.round(parsedData.current.temp);
                    var humidity = parsedData.current.humidity;
                    var wndspd = Math.round(parsedData.current.wind_speed * 3.6);
                    var uvi = parsedData.current.uvi;

                    itemEl1.textContent = `Temp: ${temp}ºC`;
                    itemEl2.textContent = `Humidity: ${humidity}%`;
                    itemEl3.textContent = `Wind: ${wndspd} km/h`;
                    itemEl4.textContent = `UV Index: `;
                    span.textContent = `${uvi}`;

                    currentWxList.append(itemEl1);
                    currentWxList.append(itemEl2);
                    currentWxList.append(itemEl3);
                    currentWxList.append(itemEl4);
                    itemEl4.append(span);

                    if (uvi <= 2.99) {
                        span.setAttribute('style', 'background-color: #ccff99; border: 2px solid green; border-radius: 3px; padding: 0px 3px 0px 3px;');
                    } else if (uvi >= 3.00 && uvi <= 5.00) {
                        span.setAttribute('style', 'background-color: #ffff99; border: 2px solid #cccc00; border-radius: 3px; padding: 0px 3px 0px 3px;');
                    } else if (uvi >= 6.00 && uvi <= 7.00) {
                        span.setAttribute('style', 'background-color: #ffd699; border: 2px solid orange; border-radius: 3px; padding: 0px 3px 0px 3px;;');
                    } else {
                        span.setAttribute('style', 'background-color: #ffad99; border: 2px solid red; border-radius: 3px; padding: 0px 3px 0px 3px;');
                        span.textContent = `${uvi} - We're all going to die!`;
                    }

                    //Clear all first
                    for (let index = 1; index < 6; index++) {
                        
                        document.getElementById([index]).innerHTML = '';
                        
                    }

                    //Display the 5 Day Forecast
                    for (let index = 1; index < 6; index++) {

                        var date = parsedData.daily[index].dt;
                        date = moment.unix(date).format("MM/D");
                        var icon = parsedData.daily[index].weather[0].icon;
                        var temp = Math.round(parsedData.daily[index].temp.max);
                        var humidity = parsedData.daily[index].humidity;
                        var wnd = Math.round(parsedData.daily[index].wind_speed * 3.6);

                        var hdg = document.createElement('h3');
                        var img = document.createElement('img');
                        var listEl = document.createElement('ul');
                        var liEl1 = document.createElement('li');
                        var liEl2 = document.createElement('li');
                        var liEl3 = document.createElement('li');

                        listEl.setAttribute('class', 'fiveDayList');
                        img.setAttribute('src', 'https://openweathermap.org/img/w/' + icon + '.png');

                        hdg.textContent = date;
                        liEl1.textContent = `Temp: ${temp}ºC`;
                        liEl2.textContent = `Humidity: ${humidity}%`;
                        liEl3.textContent = `Wind: ${wnd} km/h`;

                        document.getElementById([index]).append(hdg);
                        hdg.insertAdjacentElement('afterend', img);
                        img.insertAdjacentElement('afterend', listEl);
                        listEl.appendChild(liEl1);
                        liEl1.insertAdjacentElement('afterend', liEl2);
                        liEl2.insertAdjacentElement('afterend', liEl3);
                    }

                })

        });
};

//Search History Display
function displayHistory() {

    for (let index = 0; index < searchHistory.length; index++) {

        var listEl = document.getElementById('history');
        var cityList = document.createElement('li');
        var button = document.createElement('button');

        cityList.setAttribute('class', 'd-grid gap-2');
        button.setAttribute('class', 'btn btn-outline-secondary btn-sm mt-1');
        button.textContent = searchHistory[index];

        listEl.append(cityList);
        cityList.append(button);

        button.addEventListener('click', function (e) {
            getWx(e, searchHistory[index])
        })
    }
}

displayHistory();

searchBtn.addEventListener('click', getWx);