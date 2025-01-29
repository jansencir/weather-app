// Grab user input
const searchCityForm = document.getElementById("search-city-form");
const apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const myKey = "?key=28AP59HQHVPSMRZYL9C4AZKVB";


const displayInfo = (domEl , newText) => {
  domEl.textContent = newText;
}

const fahrenheitToCelsius = (f) => {
  const toCelsius = (f - 32) * (5/9);
  return toCelsius.toFixed(1);
}

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
  const cityTime = currentConditions.datetime;
  console.log(cityTime.slice(0, cityTime.length - 3));

  const cityTimeSunrise = currentConditions.sunrise;
  console.log("sunset: " + cityTimeSunrise.slice(0, cityTimeSunrise.length - 3));

  const cityTimeSunset = currentConditions.sunset;
  console.log("sunset: " + cityTimeSunset.slice(0, cityTimeSunset.length - 3));
  // 222: Create function that turns time into AM or PM
  // 13%12 returns 1, if the first number is larger than 12, use pm
  // if the first number is smaller than 12, use am
  // if the first number is a zero, use 12am
  // if the first number is a 12, use 12pm


  // City Info
  const cityDetails = cityJSON.resolvedAddress;
  const cityDetailsArray = cityDetails.split(",").map(str => str.trim());
  console.log(cityDetailsArray);


  // Temperature Info
  const tempActual = currentConditions.temp;
  console.log("temperature: " + tempActual)

  // Feels like temp
  const tempFeels = currentConditions.feelslike;
  console.log("feels like: " + tempFeels);

  // Day
  const day = cityJSON.days[0];
  console.log(day);

  // Temp high
  const tempHigh = cityJSON.days[0].tempmax;
  console.log("temperature high: " + tempHigh);

  // Temp low
  const tempLow = cityJSON.days[0].tempmin;
  console.log("temperature low: " + tempLow);
  // 222: Add function that converts F to C
  // Take F, do the math, return C


  // Day & Week Outlook
  // Day Outlook
  const outlookDay = cityJSON.days[0].description;
  console.log("day description: " + outlookDay);

  // Week 
  const outlookWeek = cityJSON.description;
  console.log("week outlook: " + outlookWeek);


  // Current Weather Conditions
  // Precipitation
  const currentPrecipitation = currentConditions.precip;
  const currentPrecipitationProb = currentConditions.precipprob
  console.log("precipitation: " + currentPrecipitation + ` (${currentPrecipitationProb}%)`);

  // Humidity
  const currentHumidity = currentConditions.humidity;
  console.log("humidity: " + currentHumidity);

  // Wind Speed
  const currentWindSpeed = currentConditions.windspeed;
  console.log("wind speed: " + currentWindSpeed);

  // Wind Direction
  const currentWindDir = currentConditions.winddir;
  console.log("wind direction: " + currentWindDir)

  // Visibility
  const currentVisibility = currentConditions.visibility;
  console.log("visibility: " + currentVisibility)

  // Cloud Cover
  const currentCloudCover = currentConditions.cloudcover;
  console.log("cloud cover: " + currentCloudCover);

  // UV Index
  const currentUVIndex = currentConditions.uvindex;
  console.log("uv index: " + currentUVIndex);


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