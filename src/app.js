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

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  let newTemperature = Math.round(response.data.main.temp);
  let center = document.querySelector("#current-temperature");
  center.innerHTML = `${newTemperature}`;

  let currentHighTemp = Math.round(response.data.main.temp_max);
  let leftTemp = document.querySelector("#current-high-temp");
  leftTemp.innerHTML = `${currentHighTemp}°`;

  let currentLowTemp = Math.round(response.data.main.temp_min);
  let rightTemp = document.querySelector("#current-low-temp");
  rightTemp.innerHTML = `${currentLowTemp}°`;

  //
  //
  let icon = response.data.weather[0].icon;
  let displayIcon = document.querySelector("#icon");
  displayIcon.innerHTML = `${icon}`;
  //
  //

  let description = response.data.weather[0].main;
  let displayDescription = document.querySelector("#description");
  displayDescription.innerHTML = `${description}`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let displayFeel = document.querySelector("#feels-like");
  displayFeel.innerHTML = `${feelsLike}°`;

  let humidity = response.data.main.humidity;
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = ` ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = ` ${windSpeed}km/h`;

  let displayDate = document.querySelector("#date");
  displayDate.innerHTML = formatDate(response.data.dt * 1000);

  let displayTime = document.querySelector("#time");
  displayTime.innerHTML = formatTime(response.data.dt * 1000);

  let degreesC = document.querySelector("#celsius-link");
  degreesC.classList.add("active");

  let degreesF = document.querySelector("#fahrenheit-link");
  degreesF.classList.add("inactive");
}

let city = "Seattle";
let apiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
