function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let detailsElement = document.querySelector("#current-details");

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  detailsElement.innerHTML = `${condition} <br />
 Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>`;
}

// Function to display the 5-day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="forecast-container">`;

  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="forecast-day">
          <div class="forecast-date">${formatDay(forecastDay.time)}</div>
          <img src="${forecastDay.condition.icon_url}" alt="${
        forecastDay.condition.description
      }" class="forecast-icon" />
          <div class="forecast-temperatures">
            <span class="forecast-temp-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span>
            <span class="forecast-temp-min">${Math.round(
              forecastDay.temperature.minimum
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let options = { weekday: "long" };
  return date.toLocaleDateString(undefined, options);
}

function getWeatherData(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature).catch(handleError);

  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast).catch(handleError);
}

function handleError(error) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = "City not found. Please try again.";
  console.error("Error fetching weather data:", error);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  let monthIndex = date.getMonth();
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

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

  let formattedDay = days[day];
  let formattedMonth = months[monthIndex];

  return `${formattedDay}, ${formattedMonth} ${hours}:${minutes}`;
}

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListen;
