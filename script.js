let searchInput;
let lon;
let lat;
let result;
let homePage = document.querySelector("#homePage");
let searchButton = document.querySelector("#searchButton");
let usrLocation = document.querySelector("#usrLocation");
let cityName = document.querySelector("#cityName");
let countryName = document.querySelector("#countryName");
let date = document.querySelector("#date");
let weatherIcon = document.querySelector("#weatherIcon");
let weatherCondition = document.querySelector("#weatherCondition");
let temperature = document.querySelector("#temperature");
let weatherDescription = document.querySelector("#weatherDescription");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#windSpeed");
let pressure = document.querySelector("#pressure");
let dayTime1 = document.querySelector("#dayTime1");
let dayTime2 = document.querySelector("#dayTime2");
let dayTime3 = document.querySelector("#dayTime3");
let dayTime4 = document.querySelector("#dayTime4");
let dayTime5 = document.querySelector("#dayTime5");
let dayTempValue1 = document.querySelector("#dayTempValue1");
let dayTempValue2 = document.querySelector("#dayTempValue2");
let dayTempValue3 = document.querySelector("#dayTempValue3");
let dayTempValue4 = document.querySelector("#dayTempValue4");
let dayTempValue5 = document.querySelector("#dayTempValue5");
let dayTempIcon1 = document.querySelector("#dayTempIcon1");
let dayTempIcon2 = document.querySelector("#dayTempIcon2");
let dayTempIcon3 = document.querySelector("#dayTempIcon3");
let dayTempIcon4 = document.querySelector("#dayTempIcon4");
let dayTempIcon5 = document.querySelector("#dayTempIcon5");
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


//fetch data from weatherapi.com
async function getWeather(location) {
    let res = (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cfa5d0aa0f494baba51145830250205&q=${location}&aqi=yes&days=6`));
    if(!res.ok) {
        document.querySelector("#alert").classList.remove("d-none");
        document.querySelector("#alert").classList.add("d-block");
        homePage.classList.add("d-none");
        homePage.classList.remove("d-block");
        return;
    }
    return res.json();
}


//show data to the user with the 5 day forecast
async function showData(location){
    if(location === "") {
        document.querySelector("#alert").classList.remove("d-block");
        document.querySelector("#alert").classList.remove("d-none");
        document.querySelector("#alert").classList.add("d-block");
        homePage.classList.add("d-none");
        homePage.classList.remove("d-block");
        return;
    }
    if(location.length < 3) {
        document.querySelector("#alert").classList.remove("d-block");
        document.querySelector("#alert").classList.remove("d-none");
        document.querySelector("#alert").classList.add("d-block");
        homePage.classList.add("d-none");
        homePage.classList.remove("d-block");
        return;
    }
    document.querySelector("#alert").classList.add("d-none");
    document.querySelector("#alert").classList.remove("d-block");
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
    homePage.classList.remove("d-none");
    homePage.classList.add("d-block");

    
    dayTime1.innerHTML = `${days[new Date(result.forecast.forecastday[1].date).getDay()]}, ${result.forecast.forecastday[1].date}`;
    dayTime2.innerHTML = `${days[new Date(result.forecast.forecastday[2].date).getDay()]}, ${result.forecast.forecastday[2].date}`;
    dayTime3.innerHTML = `${days[new Date(result.forecast.forecastday[3].date).getDay()]}, ${result.forecast.forecastday[3].date}`;
    dayTime4.innerHTML = `${days[new Date(result.forecast.forecastday[4].date).getDay()]}, ${result.forecast.forecastday[4].date}`;
    dayTime5.innerHTML = `${days[new Date(result.forecast.forecastday[5].date).getDay()]}, ${result.forecast.forecastday[5].date}`;
    dayTempValue1.innerHTML = result.forecast.forecastday[1].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[1].day.mintemp_c + "°C";
    dayTempValue2.innerHTML = result.forecast.forecastday[2].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[2].day.mintemp_c + "°C";
    dayTempValue3.innerHTML = result.forecast.forecastday[3].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[3].day.mintemp_c + "°C";
    dayTempValue4.innerHTML = result.forecast.forecastday[4].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[4].day.mintemp_c + "°C";
    dayTempValue5.innerHTML = result.forecast.forecastday[5].day.maxtemp_c + "°C" + " | " + result.forecast.forecastday[5].day.mintemp_c + "°C";
    dayTempIcon1.src = `https://${result.forecast.forecastday[1].day.condition.icon}`;
    dayTempIcon2.src = `https://${result.forecast.forecastday[2].day.condition.icon}`;
    dayTempIcon3.src = `https://${result.forecast.forecastday[3].day.condition.icon}`;
    dayTempIcon4.src = `https://${result.forecast.forecastday[4].day.condition.icon}`;
    dayTempIcon5.src = `https://${result.forecast.forecastday[5].day.condition.icon}`;
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

//show data of the next 5 days when day is clicked
async function enlarge(id){
    // let result = await getWeather(`${lat},${lon}`);
    document.querySelector("#alert").classList.add("d-none");
    document.querySelector("#alert").classList.remove("d-block");
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
