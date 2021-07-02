const apiKey = "74974760a33b1dee728fdbda7a227882";
let userInput = document.querySelector("#searchbar");
const searchBtn = document.querySelector("#search-btn");
let results = document.querySelector("#results");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getCityWeather();
});

function getCityWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${apiKey}`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.main);
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
