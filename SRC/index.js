function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let detailsElement = document.querySelector("#current-details");

  cityElement.innerHTML = response.data.data.city;
  temperatureElement.innerHTML = temperature;
  detailsElement.innerHTML = `${response.data.data.condition.current} <br />
    Humidity: <strong>${response.data.data.humidity.current}%</strong>, Wind: <strong>${response.data.data.wind_speed.current} km/h</strong>`;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    getCurrentWeather(city);
  }
  searchInputElement.value = "";
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let monthIndex = date.getMonth();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

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

  return `${days[day]}, ${months[monthIndex]} ${hours}:${minutes}`;
}

function getCurrentWeather(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayTemperature)
    .catch((error) => {
      alert("Error fetching weather data. Please try again.");
      console.error("Error:", error);
    });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

getCurrentWeather("Pretoria");
