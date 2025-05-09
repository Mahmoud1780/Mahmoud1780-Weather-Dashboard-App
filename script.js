let searchInput;
let lon;
let lat;
let result;
let homePage ;
let searchButton;
let usrLocation ;
let cityName ;
let countryName;
let date;
let weatherIcon;
let weatherCondition;
let temperature;
let weatherDescription ;
let humidity ;
let windSpeed ;
let pressure ;
init();
//array of days
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


//initialize DOM elements
function init() {
    homePage = document.querySelector("#homePage");
    searchButton = document.querySelector("#searchButton");
    usrLocation = document.querySelector("#usrLocation");
    cityName = document.querySelector("#cityName");
    countryName = document.querySelector("#countryName");
    date = document.querySelector("#date");
    weatherIcon = document.querySelector("#weatherIcon");
    weatherCondition = document.querySelector("#weatherCondition");
    temperature = document.querySelector("#temperature");
    weatherDescription = document.querySelector("#weatherDescription");
    humidity = document.querySelector("#humidity");
    windSpeed = document.querySelector("#windSpeed");
    pressure = document.querySelector("#pressure");
}

//fetch data from weatherapi.com
async function getWeather(location) {
    let res = (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfa5d0aa0f494baba51145830250205&q=${location}&aqi=yes&days=14`));
    if(!res.ok) {
        showAlert();
        hideHomePage();
        return;
    }
    return res.json();
}


//show data to the user with the 5 day forecast
async function showData(location){
    if(location === "" || location.length < 3) {
        showAlert();
        hideHomePage();
        return;
    }
    hideAlert();
    result = await getWeather(location);
    console.log(result);
    cityName.innerHTML = result.location.name;
    countryName.innerHTML = result.location.country;
    date.innerHTML = `${days[new Date(result.location.localtime).getDay()]}, ${result.location.localtime}`;
    weatherIcon.src = `https://${result.current.condition.icon}`;
    weatherCondition.innerHTML = result.current.condition.text;
    temperature.innerHTML = result.current.temp_c + "°C";
    weatherDescription.innerHTML = result.forecast.forecastday[0].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[0].day.mintemp_c + "°C";
    humidity.innerHTML = result.current.humidity + "% " + '<i class="fa-solid fa-droplet"></i>';
    windSpeed.innerHTML = result.current.wind_kph + " km/h " + '<i class="fa-solid fa-wind"></i>';
    showHomePage();
    showForecastFor(5);
}

//show data when search button is clicked
searchButton.addEventListener("click", function() {
    searchInput = document.querySelector("#searchInput").value;
    showData(searchInput);
});

//show data when enter key is pressed
searchInput = document.querySelector("#searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchButton.click(); //goto click event
    }
});

//show data when user location button is clicked
usrLocation.addEventListener("click", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        showData(`${lat},${lon}`);
        });
});

//show data when page is loaded
window.addEventListener("load", function() {
    navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        showData(`${lat},${lon}`);
    });
});

//show data of the next 5 days when day is clicked
async function enlarge(id){
    hideAlert();
    console.log(result);
    cityName.innerHTML = result.location.name;
    countryName.innerHTML = result.location.country;
    date.innerHTML = `${days[new Date(result.forecast.forecastday[id].date).getDay()]}, ${result.forecast.forecastday[id].date}`;
    weatherIcon.src = `https://${result.forecast.forecastday[id].day.condition.icon}`;
    weatherCondition.innerHTML = result.forecast.forecastday[id].day.condition.text;
    temperature.innerHTML = result.forecast.forecastday[id].day.avgtemp_c + "°C";
    weatherDescription.innerHTML = result.forecast.forecastday[id].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[id].day.mintemp_c + "°C";
    humidity.innerHTML = result.forecast.forecastday[id].day.avghumidity + "% " + '<i class="fa-solid fa-droplet"></i>';
    windSpeed.innerHTML = result.forecast.forecastday[id].day.maxwind_kph + " km/h " + '<i class="fa-solid fa-wind"></i>';
}

//display forecast for n-days
function showForecastFor(nDays) {
    for (let i = 1; i <= nDays; i++) {
        let dayTime = document.querySelector("#dayTime" + i);
        let dayTempValue = document.querySelector("#dayTempValue" + i);
        let dayTempIcon = document.querySelector("#dayTempIcon" + i);
        dayTime.innerHTML = `${days[new Date(result.forecast.forecastday[i].date).getDay()]}, ${result.forecast.forecastday[i].date}`;
        dayTempValue.innerHTML = result.forecast.forecastday[i].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[i].day.mintemp_c + "°C";
        dayTempIcon.src = `https://${result.forecast.forecastday[i].day.condition.icon}`;
    }
    
}

//show alert
function showAlert() {
    document.querySelector("#alert").classList.remove("d-block");
    document.querySelector("#alert").classList.remove("d-none");
    document.querySelector("#alert").classList.add("d-block");
}

//hide alert
function hideAlert() {
    document.querySelector("#alert").classList.remove("d-block");
    document.querySelector("#alert").classList.remove("d-none");
    document.querySelector("#alert").classList.add("d-none");
}

//hide home page
function hideHomePage() {
    homePage.classList.remove("d-block");
    homePage.classList.remove("d-none");
    homePage.classList.add("d-none");
}

//show home page
function showHomePage() {
    homePage.classList.remove("d-block");
    homePage.classList.remove("d-none");
    homePage.classList.add("d-block");
}


