function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let apiKey = "40f3565eaf0bo04aae2b14bt5e3ebe6f";
  let query = searchInputElement.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
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
