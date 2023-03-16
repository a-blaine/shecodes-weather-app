function showTemperature(response) {
  console.log(response.data);
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
}

let city = "Seattle";
let apiKey = "7ae5e58d29dbe83f5367ad389e4a99a2";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
