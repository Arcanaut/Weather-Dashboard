// const citySearch = document.getElementById("citySearch");
const name = document.getElementById("cityName");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const uvIndex = document.getElementById("uvIndex");
const desc = document.getElementById("desc");
const apiKey = "&appid=bfd42f9cd8a1cb601a5daf5baf9355ebf";
var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + /*citySearch*/ + apiKey;
var latitude = data.coord.lat;
var longitude = data.coord.lon;


let cityURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + /*cityName*/ + "&limit=1" + apiKey;
fetch (cityURL)
.then(function (response) {
    response.json().then(function(data)





function pullWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +  + apiKey)
    .then(function (response) {
                response.json().then(function (response) {
                        console.log(data);

                }
            
            

    
// That gives you the coordinates
// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=6bd99a172fcab706a75e9217f1badfef").then(function(response) {
//     response.json().then(function(oneCall) {
//     console.log(oneCall);





// response.json().then(function(data) {
//     console.log(data);
//     console.log(data.coord)
//     });
// });