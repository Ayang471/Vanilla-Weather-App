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

    return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city").innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description").innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "41653189222a9f622e0f370d2ef32efe";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=new york&appid=41653189222a9f622e0f370d2ef32efe&units=metric";

axios.get(apiUrl).then(displayTemperature);