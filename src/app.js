function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let current = new Date(timestamp);
  let day = days[current.getDay()];
  let date = current.getDate();
  let month = months[current.getMonth()];
  let year = current.getFullYear();
  return `${day} ${date} ${month}, ${year}`;
}

function formatTime() {
  let time = new Date();
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function formatForecast(response) {
  let weatherForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  weatherForecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="forecast-day">${formatForecastDay(forecastDay.dt)}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
        <div class="forecast-temperature">
            <span class="forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>/
            <span class="low-temp">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function fetchForecast(coordinates) {
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(formatForecast);
}

function showTemperature(response) {
  let h1 = document.querySelector("#city");
  let centerTemp = document.querySelector("#current-temperature");
  let leftTemp = document.querySelector("#current-high-temp");
  let rightTemp = document.querySelector("#current-low-temp");
  let displayDescription = document.querySelector("#description");
  let displayFeel = document.querySelector("#feels-like");
  let displayHumidity = document.querySelector("#humidity");
  let displayWind = document.querySelector("#wind");
  let displayDate = document.querySelector("#date");
  let displayTime = document.querySelector("#time");
  let displayIcon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  currentHighTemperatureC = response.data.main.temp_max;
  currentLowTemperatureC = response.data.main.temp_min;
  feelsLikeTemperatureC = response.data.main.feels_like;
  h1.innerHTML = response.data.name;
  centerTemp.innerHTML = `${Math.round(celsiusTemperature)}`;
  leftTemp.innerHTML = `${Math.round(currentHighTemperatureC)}°`;
  rightTemp.innerHTML = `${Math.round(currentLowTemperatureC)}°`;
  displayDescription.innerHTML = `${response.data.weather[0].main}`;
  displayFeel.innerHTML = ` ${Math.round(feelsLikeTemperatureC)}°`;
  displayHumidity.innerHTML = ` ${response.data.main.humidity}%`;
  displayWind.innerHTML = ` ${Math.round(response.data.wind.speed)} km/h`;
  displayDate.innerHTML = formatDate(response.data.dt * 1000);
  displayTime.innerHTML = formatTime(response.data.dt * 1000);
  displayIcon.setAttribute("alt", response.data.weather[0].description);
  displayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  fetchForecast(response.data.coord);
}

function fetchLocation(position) {
  let currentApiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${currentApiKey}&units=metric`;
  axios.get(currentApiUrl).then(showTemperature);
}

function handleButtonSubmit() {
  navigator.geolocation.getCurrentPosition(fetchLocation);
}

function search(city) {
  let apiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-input");
  search(cityName.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let centerTempElement = document.querySelector("#current-temperature");
  let leftTempElement = document.querySelector("#current-high-temp");
  let rightTempElement = document.querySelector("#current-low-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  centerTempElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  leftTempElement.innerHTML = `${Math.round(
    (currentHighTemperatureC * 9) / 5 + 32
  )}°`;
  rightTempElement.innerHTML = `${Math.round(
    (currentLowTemperatureC * 9) / 5 + 32
  )}°`;
  feelsLikeElement.innerHTML = `${Math.round(
    (feelsLikeTemperatureC * 9) / 5 + 32
  )}°`;
  fahrenheitLink.classList.remove("inactive");
  celsiusLink.classList.add("inactive");
  centerContentsDiv.classList.add("fahrenheit");
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let centerTempElement = document.querySelector("#current-temperature");
  let leftTempElement = document.querySelector("#current-high-temp");
  let rightTempElement = document.querySelector("#current-low-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  centerTempElement.innerHTML = Math.round(celsiusTemperature);
  leftTempElement.innerHTML = `${Math.round(currentHighTemperatureC)}°`;
  rightTempElement.innerHTML = `${Math.round(currentLowTemperatureC)}°`;
  feelsLikeElement.innerHTML = `${Math.round(feelsLikeTemperatureC)}°`;
  fahrenheitLink.classList.add("inactive");
  celsiusLink.classList.remove("inactive");
  centerContentsDiv.classList.remove("fahrenheit");
}

let celsiusTemperature = null;
let currentHighTemperatureC = null;
let currentLowTemperatureC = null;
let feelsLikeTemperatureC = null;
let centerContentsDiv = document.querySelector(".current-contents-center");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("button");
button.addEventListener("click", handleButtonSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Seattle");
