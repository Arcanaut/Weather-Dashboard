const apiKey = "bfd42f9cd8a1cb601a5daf5baf9355eb";
const lang = 'en';

//declare global associations with HTML elements
const searchText = document.getElementById("search-text");
const searchBtn = document.getElementById("search-btn");
const clearHistory = document.getElementById("clr-history");
const displayCity = document.getElementById("display-city");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const uvEl = document.getElementById("UV-index");
const history = document.getElementById("history");
var forecastFive = document.getElementById("fiveday-header");
var currentWeather = document.getElementById("today-weather");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


//call this function to kick off the app
function startApp() {
    //function that fetches data from multiple endpoints and creates dynamic html to to display current weather and forecast
    function getWeather(cityName) {
        // fetch current weather from open weather api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
        fetch(queryURL)
            //once you have the data convert it to JSON
            .then(function (response) {
                response.json().then(function (data) {
            //make current weather container visible
                currentWeather.classList.remove("d-none");

                // get current city and date and display in H3
                const currentDate = new Date(data.dt * 1000);
                displayCity.innerHTML = data.name + " (" + (currentDate.getMonth()+1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ") ";
                displayCity.setAttribute("class", "font-weight-bold");

                //take icon data from API and display it below city name/date
                let currentIcon = data.weather[0].icon;
                icon.setAttribute("src", "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png");
                icon.setAttribute("alt", data.weather[0].description);

                //take values from temp, humidity, and wind speed and inject them into the associated P element
                temp.innerHTML = "<b>Temperature: </b>" + Math.round(data.main.temp) + " &#176F";
                humidity.innerHTML = "<b>Humidity: </b>" + data.main.humidity + "%";
                wind.innerHTML = "<b>Wind Speed: </b>" + data.wind.speed + " MPH";
                
                // fetch UV index data from API
                let fetchUV = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + apiKey + "&cnt=1";
                fetch(fetchUV)
                    // then convert the data to JSON
                    .then(function (response) {
                        response.json().then(function (data) {

                            uvEl.innerHTML = "<b>UV Index: </b>"
                            //then create a new html element to display the UV index
                            let UVIndex = document.createElement("span");
                            UVIndex.innerHTML =  + Math.floor(data[0].value);
                            uvEl.append(UVIndex);
                            
                            //if else statement to set the color of UV index element based on UV severity
                            if (data[0].value < 3 ) {
                                UVIndex.setAttribute("class", "badge  badge-pill badge-success");
                            }
                            else if (data[0].value < 6) {
                                UVIndex.setAttribute("class", "badge badge-pill badge-warning badge-lighten-1");
                            }
                            else if (data[0].value < 8) {
                                UVIndex.setAttribute("class", "badge badge-pill badge-warning badge-darken-3");
                            }
                            else if (data[0].value < 11) {
                                UVIndex.setAttribute("class", "badge badge-pill badge-danger badge-lighten-1");
                            }
                            else {
                                UVIndex.setAttribute("class", "badge badge-pill badge-danger badge-darken-3");
                            }
                    });
                
                // Fetch the forecast data from the forecast endpoint
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + data.id + "&units=imperial&appid=" + apiKey;
                fetch(forecastQueryURL)
                    //then convert the data to JSON
                    .then(function (response) {
                        response.json().then(function (data) {

                        // //Then make the forecast container visible
                        forecastFive.classList.remove("d-none");
                        
                        //  associate each div with the class of forecast to a variable
                        const forecastCards = document.querySelectorAll(".forecast");

                        //loop through each div with the class of forecast and create elements to display date, img, temp, wind, and humidity
                        for (i = 0; i < forecastCards.length; i++) {

                            //pull date data for each forecast card and append a date element
                            forecastCards[i].innerHTML = "";
                            const index = i * 8 + 4;
                            const setDate = new Date(data.list[index].dt * 1000);
                            const setDateEl = document.createElement("p");
                            setDateEl.setAttribute("class", "mt-3 mb-0 forecast-date font-weight-bold text-dark");
                            setDateEl.innerHTML = (setDate.getMonth() + 1) + "/" + setDate.getDate() + "/" + setDate.getFullYear();
                            forecastCards[i].append(setDateEl);

                            // create img element for each card and set alt tag to it's icon description
                            const forecastImgs = document.createElement("img");
                            forecastImgs.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png");
                            forecastImgs.setAttribute("alt", data.list[index].weather[0].description);
                            forecastCards[i].append(forecastImgs);
                            
                            //create elements for forecast temp and append to card
                            const forecastTemps = document.createElement("p");
                            forecastTemps.innerHTML = "<b> Temp:</b> " + Math.round(data.list[index].main.temp) + " &#176F";
                            forecastCards[i].append(forecastTemps);

                            //create elements for forecast wind and append to card
                            const forecastWinds = document.createElement("p");
                            forecastWinds.innerHTML = "<b>Wind Speed:</b> " + "<br>" + data.list[index].wind.speed + " MPH";
                            forecastCards[i].append(forecastWinds);

                            //create elements for forecast humidity and append to card
                            const forecastHumiditys = document.createElement("p");
                            forecastHumiditys.innerHTML = "<b>Humidity:</b> " + data.list[index].main.humidity + "%";
                            forecastCards[i].append(forecastHumiditys);
                        }
                    })
                });
            });
        });
    });
}

    // When the user clicks the search button... 
    searchBtn.addEventListener("click", function () {
        
        //take the text they input in the search bar and set it to variable SearchTerm
        const searchTerm = searchText.value;

        //push the searchTerm through as a parameter in getWeather function
        getWeather(searchTerm);

        //push search history array contents that match the search term to local storage
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        showHistory();
        clearSearchBar();
    })

    // or if the user presses enter on the keyboard in the search bar
    searchText.addEventListener("keypress", function (e) {
        //if the enter key is pressed
        if (e.key === "Enter") {
        //take the text they input in the search bar and set it to variable SearchTerm
        const searchTerm = searchText.value;

        //push the searchTerm through as a parameter in getWeather function
        getWeather(searchTerm);

        //push search history array contents that match the search term to local storage
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        showHistory();
        clearSearchBar();
        }
    })

    // When the user clicks the clear history button...
    clearHistory.addEventListener("click", function () {
        
        //delete all local storage and set history array to empty
        localStorage.clear();
        searchHistory = [];
        showHistory();
    })

    //create html elements for each previous search
    function showHistory() {
        history.innerHTML = "";
        
        // loop through the history array and create an input element for each previous search with the listed attributes
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block m-1 bg-secondary text-white text-capitalize text-center");
            historyItem.setAttribute("value", searchHistory[i]);

            //when the user clicks one of their previous searches, pass the name of the previous search into the get weather function
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            history.append(historyItem);
        }
    }

    showHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
    
    var clearSearchBar = () => {
        searchText.value= "";
    }
}

startApp();