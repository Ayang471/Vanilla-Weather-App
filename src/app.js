function formatDate(timestamp) {
    let now = new Date(timestamp);
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0:${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0:${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];

    return ` ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row" >`;
    //let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML +
                `
        <div class="col-2">
            <div class="weather-forecast-date">
               ${formatDay(forecastDay.dt)}
              </div>
                <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"
                />
                <div class ="weather-forecast-temperature">
                <span class = "weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                <span class = "weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
            </div>
        </div>
    `;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    //console.log(coordinates);
    let apiKey = `41653189222a9f622e0f370d2ef32efe`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=41653189222a9f622e0f370d2ef32efe&units=metric`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let maxTemp = document.querySelector("#high");
    let minTemp = document.querySelector("#low");
    let iconElement = document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    maxTemp.innerHTML = Math.round(response.data.main.temp_max);
    minTemp.innerHTML = Math.round(response.data.main.temp_min);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);


    getForecast(response.data.coord);

}

function search(city) {
    let apiKey = `41653189222a9f622e0f370d2ef32efe`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector(`#city-input`);
    search(cityInputElement.value);
}


function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector(`#temperature`);

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector(`#temperature`);
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = `41653189222a9f622e0f370d2ef32efe`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=41653189222a9f622e0f370d2ef32efe&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search(`San Jose`);


navigator.geolocation.getCurrentPosition(showPosition);


function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location")
currentLocation.addEventListener(`click`, getCurrentLocation);