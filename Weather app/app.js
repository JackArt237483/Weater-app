const apiKey = '470aabd089e2a6eedfca5300543d94fd';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function searchWeather() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const url = `${apiUrl}?q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    if (data.cod === '404') {
      alert('City not found.');
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('Failed to fetch weather data. Please try again later.');
  }
}

function displayWeather(data) {
  const searchBlock = document.getElementById('search_block');
  const headBlock = document.getElementById('head_block');
  const mobileBlock = document.getElementById('mobile_block')

  // Hide search block
  searchBlock.style.display = 'none';

  // Update head block with weather information
  const cityLocation = document.querySelector('.city_location p');
  const weatherInfo = document.querySelector('.info h2');
  const temperature = document.querySelector('.info h3');
  const textDate = document.querySelector('.text_date');
  const mobileCityLocation = document.querySelector('.mobile_city p');
  const mobileWeatherInfo = document.querySelector('.mobile_weather_block h6');
  const mobileTemperature = document.querySelector('.mobile_weather_block h3');
  const mobileTextDate = document.querySelector('.text_date_mobile');
  const realTemperatureCelsius = Math.round(data.main.feels_like - 273.15);

  document.querySelector("#temperature").textContent = `${realTemperatureCelsius}°C`;
  document.querySelector("#wind").textContent = `${data.wind.speed} km/hr`;
  document.querySelector("#rain").textContent = `${data.clouds.all}%`;
  document.querySelector("#index").textContent = data.uvi;


  cityLocation.textContent = data.name;
  weatherInfo.textContent = data.weather[0].main;
  temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
  textDate.textContent = new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  mobileCityLocation.textContent = data.name;
  mobileWeatherInfo.textContent = data.weather[0].main;
  mobileTemperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;
  mobileTextDate.textContent = new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  // Show head block
  headBlock.style.display = 'block';
  mobileBlock.style.display = 'block'
}

function updateTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let timeString = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + " GMT";
  document.querySelector("#real_time").textContent = timeString;
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}
// Update time every second
setInterval(updateTime, 1000);

