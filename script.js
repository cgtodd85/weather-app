const apiKey = "74974760a33b1dee728fdbda7a227882";
let userInput = document.querySelector("#searchbar");
const searchBtn = document.querySelector("#search-btn");
let results = document.querySelector("#results");
let fiveDay = [
  {
    date: "",
    icon: "",
    temp: "",
    hum: "",
  },
  {
    date: "",
    icon: "",
    temp: "",
    hum: "",
  },
  {
    date: "",
    icon: "",
    temp: "",
    hum: "",
  },
  {
    date: "",
    icon: "",
    temp: "",
    hum: "",
  },
  {
    date: "",
    icon: "",
    temp: "",
    hum: "",
  },
];

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getCityWeather();
});

userInput.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    getCityWeather();
  }
});

function getCityWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("This is the city weather fetch: ", data);
      let lon = data.coord.lon;
      let lat = data.coord.lat;
      oneCallApi(lat, lon);

      let feelsLike = Math.round(((data.main.feels_like - 273) * 9) / 5 + 32);
      let temp = Math.round(((data.main.temp - 273) * 9) / 5 + 32);
      let humidity = data.main.humidity;
      let tempMax = Math.round(((data.main.temp_max - 273) * 9) / 5 + 32);
      let tempMin = Math.round(((data.main.temp_min - 273) * 9) / 5 + 32);
      console.log("It feels like " + feelsLike + " degrees fahrenheit");
      results.innerHTML = `
      <div>The weather for ${userInput.value}!</div>
      <div>
        <p>Temp: ${temp} F</p>
        <p>Feels Like: ${feelsLike} F</p>
        <p>Humidity: ${humidity} percent</p>
        <p>High: ${tempMax} F</p>
        <p>Low: ${tempMin} F</p>
        <p></p>
      </div>`;
    });
}

function oneCallApi(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log("This is the one call data: ", data);
      for (i = 0; i < fiveDay.length; i++) {
        fiveDay[i].date = data.daily[i].dt;
        fiveDay[i].icon = data.daily[i].weather[0].icon;
        fiveDay[i].temp = data.daily[i].temp.day;
        fiveDay[i].hum = data.daily[i].humidity;
      }
      console.log("Five Day Array: ", fiveDay);
    });
}
/*
city name
date
icon for weather conditions
5 day each with temp, conditions, humidity

fiveDay

search history select prev searched cities

how to protect apikey?
how to load weather icon?


To make it more precise put the city's name, comma, 2-letter country code (ISO3166). You will get all proper cities in chosen country.
The order is important - the first is city name then comma then country. Example - London, GB or New York, US.
    
`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`

    
    */
