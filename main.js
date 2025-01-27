// Grab user input
const searchCityForm = document.getElementById("search-city-form");

const myKey = "key=28AP59HQHVPSMRZYL9C4AZKVB";

const tempURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?";


searchCityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchCityInput = document.getElementById("search");
  console.log(searchCityInput.value);
  console.log("clicked");


  const mySearch = tempURL + myKey;

  const searchUp = await fetch(mySearch);
  const jsonSearch = await searchUp.json();
  // console.log(jsonSearch);


  // WEATHER CONDITIONS
  console.log("Weather Conditions")
  const currentWeather = jsonSearch.currentConditions;
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
 * Color changing weather
 *  Take each general weather condition
 *  Set color depending on that weather condition
 */