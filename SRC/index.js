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

function handleError(error) {
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = "City not found. Please try again.";
  console.error("Error fetching weather data:", error);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();

  if (city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    // Fetch weather data
    axios.get(apiUrl).then(displayTemperature).catch(handleError);
  } else {
    alert("Please enter a city name.");
  }
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

// Display the current date
let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDate;
