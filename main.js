// Grab User Input
const searchCityForm = document.getElementById("search-city-form");
const apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const myKey = "?key=28AP59HQHVPSMRZYL9C4AZKVB";

// Functions
const displayInfo = (domEl , newText) => {
  domEl.textContent = newText;
}

const timeAmPm = (time) => {
  let hour = parseInt(time.split(":")[0]);
  let minute = time.split(":")[1];

  if (hour === 0) {
    hour = 12;
    return `${hour}:${minute}AM`;
  } else if (hour > 0 && hour < 12) {
    return `${hour}:${minute}AM`;
  } else if (hour === 12) {
    return `${hour}:${minute}PM`;
  } else if (hour > 12) {
    hour = hour%12
    return `${hour}:${minute}PM`;
  }
}

const fahrenheitToCelsius = (f) => {
  const toCelsius = ((f - 32) * (5/9)).toFixed(1);
  return `${f}°F/${toCelsius}°C`;
}

const mphToKph = (mph) => {
  const toKph = (mph * 1.60934).toFixed(1);
  return `${mph}mph / ${toKph}kph`;
}

const compassDirection = (degree) => {
  if (degree >= 337.6 || degree <= 22.5) {
    return `${degree} - North`;
  } else if (degree >= 22.6 && degree <= 67.5) {
    return `${degree} - Northeast`;
  } else if (degree >= 67.6 && degree <= 112.5) {
    return `${degree} - East`;
  } else if (degree >= 112.6 && degree <= 157.5) {
    return `${degree} - Southeast`;
  } else if (degree >= 157.6 && degree <= 202.5) {
    return `${degree} - South`;
  } else if (degree >= 202.6 && degree <= 247.5) {
    return `${degree} - Southwest`;
  } else if (degree >= 247.6 && degree <= 292.5) {
    return `${degree} - West`;
  } else if (degree >= 292.6 && degree <= 337.5) {
    return `${degree} - Northwest`;
  }
}

const weatherSoon = (city) => {
  let day = 0;
  for (let i = 1; i <= 6; i++) {
    let hour = parseInt(city.currentConditions.datetime.slice(0, 2));
    hour += i;

    if (hour > 23) {
      day = 1;
      hour %= 24;
    }

    const upcomingTime = timeAmPm(`${hour}:00`);
    const upcomingTemp = city.days[day].hours[hour].temp;
    const upcomingConditions = city.days[day].hours[hour].conditions;

    let domWeatherSoon = document.querySelector(`.weather-soon-${i}`);
    domWeatherSoon.innerHTML = `
    <p>${upcomingTime}</p>
    <p>${fahrenheitToCelsius(upcomingTemp)}</p>
    <p>${upcomingConditions}</p>
    `
  }
}


// Controller
searchCityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchCityInput = document.getElementById("search");
  const city = searchCityInput.value;

  const citySearch = await fetch(apiURL + city + myKey);
  const cityJSON = await citySearch.json();
  console.log(cityJSON);

  // Current Conditions
  const currentConditions = cityJSON.currentConditions;
  console.log(currentConditions);

  // Time Info
  const cityTime = currentConditions.datetime.slice(0, this.length - 3);
  const domCityTime = document.querySelector(".city-time");
  displayInfo(domCityTime, timeAmPm(cityTime));

  const cityTimeSunrise = currentConditions.sunrise.slice(0, this.length - 3);
  const domCitySunrise = document.querySelector(".city-time-sunrise");
  displayInfo(domCitySunrise, timeAmPm(cityTimeSunrise));

  const cityTimeSunset = currentConditions.sunset;
  const domCitySunset = document.querySelector(".city-time-sunset");
  displayInfo(domCitySunset, timeAmPm(cityTimeSunset));

  // City Info
  const cityDetails = cityJSON.resolvedAddress;
  const cityDetailsArray = cityDetails.split(",").map(str => str.trim());
  
  const domCityName = document.querySelector(".city-name");
  const domStateName = document.querySelector(".state-name");
  const domCountryName = document.querySelector(".country-name");

  displayInfo(domCityName, cityDetailsArray[0]);
  displayInfo(domStateName, cityDetailsArray[1]);
  displayInfo(domCountryName, cityDetailsArray[2]);

  // Temperature Info
  const tempActual = currentConditions.temp;
  const domTempActual = document.querySelector(".temp-current");
  displayInfo(domTempActual, fahrenheitToCelsius(tempActual));

  // Feels Like Temp
  const tempFeels = currentConditions.feelslike;
  const domTempFeels = document.querySelector(".temp-feels");
  displayInfo(domTempFeels, fahrenheitToCelsius(tempFeels));
  
  // Temp low
  const tempLow = cityJSON.days[0].tempmin;
  const domTempLow = document.querySelector(".temp-low");
  displayInfo(domTempLow, fahrenheitToCelsius(tempLow));

  // Temp high
  const tempHigh = cityJSON.days[0].tempmax;
  const domTempHigh = document.querySelector(".temp-high");
  displayInfo(domTempHigh, fahrenheitToCelsius(tempHigh));

  // Day & Week Outlook
  const outlookDay = cityJSON.days[0].description;
  const domOutlookDay = document.querySelector(".day-outlook");
  displayInfo(domOutlookDay, outlookDay);

  const outlookWeek = cityJSON.description;
  const domOutlookWeek = document.querySelector(".week-outlook");
  displayInfo(domOutlookWeek, outlookWeek);

  // Current Weather Conditions
  const currentWeather = currentConditions.conditions;
  const domCurrentWeather = document.querySelector(".conditions");
  displayInfo(domCurrentWeather, currentWeather);

  // Precipitation
  const currentPrecipitation = currentConditions.precip;
  const currentPrecipitationProb = currentConditions.precipprob
  const domCurrentPrecipitation = document.querySelector(".precipitation");
  displayInfo(domCurrentPrecipitation, `${currentPrecipitation} (${currentPrecipitationProb}%)`)

  // Humidity
  const currentHumidity = currentConditions.humidity;
  const domCurrentHumidity = document.querySelector(".humidity");
  displayInfo(domCurrentHumidity, currentHumidity);

  // Wind Speed
  const currentWindSpeed = currentConditions.windspeed;
  const domCurrentWindSpeed = document.querySelector(".wind-speed");
  displayInfo(domCurrentWindSpeed, mphToKph(currentWindSpeed));

  // Wind Direction
  const currentWindDir = currentConditions.winddir;
  const domCurrentWindDir = document.querySelector(".wind-dir");
  displayInfo(domCurrentWindDir, compassDirection(currentWindDir));

  // Visibility
  const currentVisibility = currentConditions.visibility;
  const domCurrentVisibility = document.querySelector(".visibility");
  displayInfo(domCurrentVisibility, currentVisibility);

  // Cloud Cover
  const currentCloudCover = currentConditions.cloudcover;
  const domCurrentCloudCover = document.querySelector(".cloud-cover");
  displayInfo(domCurrentCloudCover, currentCloudCover);

  // UV Index
  const currentUVIndex = currentConditions.uvindex;
  const domCurrentUVIndex = document.querySelector(".uv-index");
  displayInfo(domCurrentUVIndex, currentUVIndex);

  // Upcoming Weather
  weatherSoon(cityJSON);
})

/**Conditions to Grab
 * Conditions
 * Precipitation
 * Humidity
 * Wind Speed
 * Wind Direction
 * Visibility
 * Cloud Cover
 * UV Index
*/


/**Pseudocode
 * Grab user input
 *  Check if the city exists
 *    If city exists, grab info
 *    If city doesn't, notify user
 * Fetch city from VC API
 *  Turn into a JS object
 *  Start grabbing info you want
 *  Display the info you want in the specific area
 * ADD FUNCTION TO CATCH ERRORS AND NOTIFY USER
 * Color changing weather
 *  Take each general weather condition
 *  Set color depending on that weather condition
 */