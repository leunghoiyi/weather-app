function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let apiKey = "40f3565eaf0bo04aae2b14bt5e3ebe6f";
  let query = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);

  getForecast(query);
}

function handleError(error) {
  if (error.response && error.response.data.status === "not_found") {
    alert("City not found. Please try again.");
  } else {
    alert("An error occurred. Please try again later.");
  }
}

function displayTemperature(response) {
  if (response.data.status === "not_found") {
    alert("City not found. Please enter a valid city name.");
    return;
  }

  let cityElement = document.querySelector("#current-city");
  let cityName = response.data.city;
  let countryName = response.data.country;
  cityElement.innerHTML = `${cityName}, ${countryName}`;

  let temperatureElement = document.querySelector(".current-temperature-value");
  let currentTemperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = currentTemperature;
  let conditionElement = document.querySelector(".condition");
  conditionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let iconElement = document.querySelector(".current-temperature-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  console.log(response);
  console.log(response.data.time);

  function formatDate(currentDate) {
    let minutes = currentDate.getMinutes();
    let hours = currentDate.getHours();
    let day = currentDate.getDay();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }

  let currentDateElement = document.querySelector(".current-date");
  let currentDate = new Date(response.data.time * 1000);
  currentDateElement.innerHTML = formatDate(currentDate);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

window.onload = function () {
  let searchInputElement = document.querySelector("#search-input");
  searchInputElement.value = "Tallinn"; // Set the input value to Tallinn
  search(new Event("submit")); // Trigger the search function as if the form is submitted
};

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "40f3565eaf0bo04aae2b14bt5e3ebe6f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            
            <div ><img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" alt="${
          day.condition.description
        }"/></div>
            
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-max-temperature">${Math.round(
                day.temperature.maximum
              )}°C</div>
              <div class="weather-forecast-min-temperature">${Math.round(
                day.temperature.minimum
              )}°C</div>
            </div></div>
          
         `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}
