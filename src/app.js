function formatDate(timestamp) {
  let current = new Date(timestamp);
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

function showTemperature(response) {
  let centerTemp = document.querySelector("#current-temperature");
  centerTemp.innerHTML = `${Math.round(response.data.main.temp)}`;

  let leftTemp = document.querySelector("#current-high-temp");
  leftTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°`;

  let rightTemp = document.querySelector("#current-low-temp");
  rightTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°`;

  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = `${response.data.weather[0].main}`;

  let displayFeel = document.querySelector("#feels-like");
  displayFeel.innerHTML = `${Math.round(response.data.main.feels_like)}°`;

  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = ` ${response.data.main.humidity}%`;

  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = ` ${Math.round(response.data.wind.speed)}km/h`;

  let displayDate = document.querySelector("#date");
  displayDate.innerHTML = formatDate(response.data.dt * 1000);

  let displayTime = document.querySelector("#time");
  displayTime.innerHTML = formatTime(response.data.dt * 1000);

  let displayIcon = document.querySelector("#icon");
  displayIcon.setAttribute("alt", response.data.weather[0].description);
  displayIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let degreesC = document.querySelector("#celsius-link");
  let degreesF = document.querySelector("#fahrenheit-link");
  degreesC.classList.add("active");
  degreesF.classList.add("inactive");
}

function fetchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let currentApiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${currentApiKey}&units=metric`;
  axios.get(currentApiUrl).then(showTemperature);
}
function buttonLocation() {
  navigator.geolocation.getCurrentPosition(fetchLocation);
}
let button = document.querySelector("button");
button.addEventListener("click", buttonLocation);

//

//

//
function newCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar");
  let h1 = document.querySelector("#city");
  h1.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", newCity);

let city = "Seattle";
let apiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
