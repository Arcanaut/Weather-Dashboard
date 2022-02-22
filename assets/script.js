// const citySearch = document.getElementById("citySearch");
// for search buttons
const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton")
const clearHistory = document.getElementById("clearHistory");
const citySearch = document.getElementById("citySearch") //in case search doesn't work
//for weather info input
const currentDate = document.getElementById("currentDate");
const desc = document.getElementById("desc");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const uvIndex = document.getElementById("uvIndex");
const infoTemplate = document.getElementById("infoTemplate");
const nextFiveDays = document.getElementById("nextFiveDays");
const key = "&appid=bfd42f9cd8a1cb601a5daf5baf9355eb";
const app = {
    init: function() {
    document.getElementById("searchButton");
    document.addEventListener('click', app.fetchWeather);
},

findCity = function(){
let key = 'bfd42f9cd8a1cb601a5daf5baf9355eb'
let cityURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ citySearch +"&limit=5&appid="+key+
fetch(cityURL) 
response.json().then(function(data) {
        app.showWeather(data);
    
    });
    }
}
var showWeather = function(data){
let row = document.querySelector("weatherCard");

    },

// cityName = $("citySearch").val();
// var cities =function(){
// cityName = $("citySearch").val();
// localStorage.setItem(cityName, cities);
// }


function pullWeather(cityName){
let weather = 'https://api.openweathermap.org/data/2.5/weather?q='+citySearch+'&cnt=1&appid=bfd42f9cd8a1cb601a5daf5baf9355eb&units=imperial'
fetch(weather)
.then(function(response){
    response.json().then(function(data){
console.log(data)
    }
    )}
)}



// var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&cnt=1&appid=bfd42f9cd8a1cb601a5daf5baf9355eb" 
// fetch(weatherUrl).then(res => console.log(res))
 //lat  data.coord.lat;

//api.openweathermap.org/data/2.5/forecast/daily?id={city ID}&cnt={cnt}&appid={API key}
