function displayTemperature(response) {
    // console.log(response.data.main.temp);
    console.log(response);
    console.log(response.data.name);
    let temperatureElement = document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#city").innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description").innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "41653189222a9f622e0f370d2ef32efe";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=new york&appid=41653189222a9f622e0f370d2ef32efe&units=metric";

axios.get(apiUrl).then(displayTemperature);