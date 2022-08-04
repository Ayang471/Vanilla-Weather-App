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

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row" >`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML + `
        <div class="col-2">
            <div class="weather-forecast-date">
               ${day}
              </div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon" width="42px"
                />
                <div class ="weather-forecast-temperature">
                <span class = "weather-forecast-temperature-max"> 20° </span>
                <span class = "weather-forecast-temperature-min"> 18° </span>
            </div>
        </div>
    `;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = `41653189222a9f622e0f370d2ef32efe`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=41653189222a9f622e0f370d2ef32efe&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
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

let celsiusTemperature = null;



let form = document.querySelector(`#search-form`);
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search(`New York`);
displayForecast();

