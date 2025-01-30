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

  console.log("timeAmPm function")
  console.log(hour);
  console.log(minute);

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
  } else if (degress >= 292.6 && degree <= 337.5) {
    return `${degree} - Northwest`;
  }
}


const weatherSoon = (city) => {
  /** Upcoming time pseudocode
   * // 222 issue: figure out how to go back to zero
   * use remainder
   * if (hour > 23) {
   * day = 1 // next day
   * hour %= 23;
   * }
   */
  let day = 0;
  console.log(day);
  for (let i = 1; i <= 6; i++) {
    let hour = parseInt(city.currentConditions.datetime.slice(0, 2));
    // console.log("hour here")
    // console.log(hour);
    hour += i;
    // console.log(`hour after plus: ${hour}`);
    if (hour > 23) {
      day = 1;
      // console.log(`check ${day}`);
      hour %= 24;
      // console.log(`check ${hour}`);
    }

    // console.log(`${hour}:00`);
    // console.log(timeAmPm(`${hour}:00`))

    const upcomingTime = timeAmPm(`${hour}:00`);
    const upcomingTemp = city.days[day].hours[hour].temp;
    const upcomingConditions = city.days[day].hours[hour].conditions;
    console.log(upcomingTime);
    console.log(fahrenheitToCelsius(upcomingTemp));
    console.log(upcomingConditions);

    console.log(day);
    console.log(hour);
    let domWeatherSoon = document.querySelector(`.weather-soon-${i}`);
    console.log(domWeatherSoon);

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

  console.log(city);
  console.log("clicked");

  const citySearch = await fetch(apiURL + city + myKey);
  const cityJSON = await citySearch.json();
  console.log(cityJSON);

  // Current Conditions
  const currentConditions = cityJSON.currentConditions;
  console.log(currentConditions);


  // Time Info
  const cityTime = currentConditions.datetime.slice(0, this.length - 3);
  console.log(cityTime.slice(0, cityTime.length - 3));
  const domCityTime = document.querySelector(".city-time");
  displayInfo(domCityTime, timeAmPm(cityTime));

  const cityTimeSunrise = currentConditions.sunrise.slice(0, this.length - 3);
  // console.log("sunset: " + cityTimeSunrise.slice(0, cityTimeSunrise.length - 3));
  const domCitySunrise = document.querySelector(".city-time-sunrise");
  displayInfo(domCitySunrise, timeAmPm(cityTimeSunrise));

  const cityTimeSunset = currentConditions.sunset;
  // console.log("sunset: " + cityTimeSunset.slice(0, cityTimeSunset.length - 3));
  const domCitySunset = document.querySelector(".city-time-sunset");
  displayInfo(domCitySunset, timeAmPm(cityTimeSunset));


  // City Info
  const cityDetails = cityJSON.resolvedAddress;
  const cityDetailsArray = cityDetails.split(",").map(str => str.trim());
  // console.log(cityDetailsArray);
  
  const domCityName = document.querySelector(".city-name");
  const domStateName = document.querySelector(".state-name");
  const domCountryName = document.querySelector(".country-name");

  displayInfo(domCityName, cityDetailsArray[0]);
  displayInfo(domStateName, cityDetailsArray[1]);
  displayInfo(domCountryName, cityDetailsArray[2]);



  // Temperature Info
  const tempActual = currentConditions.temp;
  // console.log("temperature: " + tempActual)
  const domTempActual = document.querySelector(".temp-current");
  displayInfo(domTempActual, fahrenheitToCelsius(tempActual));

  // Feels like temp
  const tempFeels = currentConditions.feelslike;
  // console.log("feels like: " + tempFeels);
  const domTempFeels = document.querySelector(".temp-feels");
  displayInfo(domTempFeels, fahrenheitToCelsius(tempFeels));

  // Day
  // const day = cityJSON.days[0];
  // console.log(day);
  
  // Temp low
  const tempLow = cityJSON.days[0].tempmin;
  // console.log("temperature low: " + tempLow);
  // 222: Add function that converts F to C
  // Take F, do the math, return C
  const domTempLow = document.querySelector(".temp-low");
  displayInfo(domTempLow, fahrenheitToCelsius(tempLow));

  // Temp high
  const tempHigh = cityJSON.days[0].tempmax;
  // console.log("temperature high: " + tempHigh);
  const domTempHigh = document.querySelector(".temp-high");
  displayInfo(domTempHigh, fahrenheitToCelsius(tempHigh));


  // Day & Week Outlook
  // Day Outlook
  const outlookDay = cityJSON.days[0].description;
  console.log("day description: " + outlookDay);
  const domOutlookDay = document.querySelector(".day-outlook");
  displayInfo(domOutlookDay, outlookDay);

  // Week 
  const outlookWeek = cityJSON.description;
  console.log("week outlook: " + outlookWeek);
  const domOutlookWeek = document.querySelector(".week-outlook");
  displayInfo(domOutlookWeek, outlookWeek);


  // Current Weather Conditions
  const currentWeather = currentConditions.conditions;
  // console.log("conditions: " + currentWeather);
  const domCurrentWeather = document.querySelector(".conditions");
  displayInfo(domCurrentWeather, currentWeather);

  // Precipitation
  const currentPrecipitation = currentConditions.precip;
  const currentPrecipitationProb = currentConditions.precipprob
  console.log("precipitation: " + currentPrecipitation + ` (${currentPrecipitationProb}%)`);
  const domCurrentPrecipitation = document.querySelector(".precipitation");
  displayInfo(domCurrentPrecipitation, `${currentPrecipitation} (${currentPrecipitationProb}%)`)

  // Humidity
  const currentHumidity = currentConditions.humidity;
  console.log("humidity: " + currentHumidity);
  const domCurrentHumidity = document.querySelector(".humidity");
  displayInfo(domCurrentHumidity, currentHumidity);

  // Wind Speed
  const currentWindSpeed = currentConditions.windspeed;
  console.log("wind speed: " + currentWindSpeed);
  const domCurrentWindSpeed = document.querySelector(".wind-speed");
  displayInfo(domCurrentWindSpeed, mphToKph(currentWindSpeed));

  // Wind Direction
  const currentWindDir = currentConditions.winddir;
  console.log("wind direction: " + currentWindDir);
  const domCurrentWindDir = document.querySelector(".wind-dir");
  displayInfo(domCurrentWindDir, compassDirection(currentWindDir));

  // Visibility
  const currentVisibility = currentConditions.visibility;
  console.log("visibility: " + currentVisibility)
  const domCurrentVisibility = document.querySelector(".visibility");
  displayInfo(domCurrentVisibility, currentVisibility);

  // Cloud Cover
  const currentCloudCover = currentConditions.cloudcover;
  console.log("cloud cover: " + currentCloudCover);
  const domCurrentCloudCover = document.querySelector(".cloud-cover");
  displayInfo(domCurrentCloudCover, currentCloudCover);

  // UV Index
  const currentUVIndex = currentConditions.uvindex;
  console.log("uv index: " + currentUVIndex);
  const domCurrentUVIndex = document.querySelector(".uv-index");
  displayInfo(domCurrentUVIndex, currentUVIndex);


  // Upcoming Weather
  weatherSoon(cityJSON);


  // const mySearch = tempURL + myKey;

  // const searchUp = await fetch(mySearch);
  // const jsonSearch = await searchUp.json();
  // console.log(jsonSearch);

  // const currentConditions = jsonSearch.currentConditions;

    
  // TIME INFO
  // const cityTime = currentConditions.datetime;
  // console.log("time: " + cityTime.slice(0, cityTime.length - 3));
  // 13%12 returns 1, if the first number is larger than 12, use pm
  // if the first number is smaller than 12, use am
  // if the first number is a zero, use 12am
  // if the first number is a 12, use 12pm

  // const citySunrise = currentConditions.sunrise;
  // console.log("sunrise: " + citySunrise.slice(0, citySunrise.length - 3));

  // const citySunset = currentConditions.sunset;
  // console.log("sunset: " + citySunset.slice(0, citySunset.length -3 ));

  /*
  // TEMPERATURE INFO
  // Actual temp
  const tempActual = currentConditions.temp;
  console.log("temperature: " + tempActual)

  // Feels like temp
  const tempFeels = currentConditions.feelslike;
  console.log("feels like: " + tempFeels);

  // Day
  const day = jsonSearch.days[0];
  console.log(day);

  // Temp high
  const tempHigh = jsonSearch.days[0].tempmax;
  console.log("temperature high: " + tempHigh);

  // Temp low
  const tempLow = jsonSearch.days[0].tempmin;
  console.log("temperature low: " + tempLow);


  // CITY INFO
  const cityDetails = jsonSearch.resolvedAddress;
  const cityDetailsArray = cityDetails.split(",").map(str => str.trim());
  console.log(cityDetailsArray);

  // OUTLOOKS
  // Day Outlook
  const outlookDay = jsonSearch.days[0].description;
  console.log("day description: " + outlookDay);

  // Week 
  const outlookWeek = jsonSearch.description;
  console.log("week outlook: " + outlookWeek);
  */


  // WEATHER CONDITIONS
  /*
  console.log("Weather Conditions")
  console.log(currentWeather);

  // Conditions
  const currentConditions = currentWeather.conditions;
  console.log("conditions: " + currentConditions);

  // Precipitation
  const currentPrecipitation = currentWeather.precip;
  console.log("precipitation: " + currentPrecipitation);

  // Humidity
  const currentHumidity = currentWeather.humidity;
  console.log("humidity: " + currentHumidity);

  // Wind Speed
  const currentWindSpeed = currentWeather.windspeed;
  console.log("wind speed: " + currentWindSpeed);

  // Wind Direction
  const currentWindDir = currentWeather.winddir;
  console.log("wind direction: " + currentWindDir)

  // Visibility
  const currentVisibility = currentWeather.visibility;
  console.log("visibility: " + currentVisibility)

  // Cloud Cover
  const currentCloudCover = currentWeather.cloudcover;
  console.log("cloud cover: " + currentCloudCover);

  // UV Index
  const currentUVIndex = currentWeather.uvindex;
  console.log("uv index: " + currentUVIndex);
  */

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