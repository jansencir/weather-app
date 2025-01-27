// Grab user input
const searchCityForm = document.getElementById("search-city-form");

const myKey = "key=28AP59HQHVPSMRZYL9C4AZKVB";

const tempURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/honolulu?";


searchCityForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchCityInput = document.getElementById("search");
  console.log(searchCityInput.value);
  console.log("clicked");


  const mySearch = tempURL + myKey;

  const searchUp = await fetch(mySearch);
  const jsonSearch = await searchUp.json();
  console.log(jsonSearch);

  const currentConditions = jsonSearch.currentConditions;

    
  // TIME INFO
  const cityTime = jsonSearch;
  const citySunrise = currentConditions.sunrise;
  console.log("sunrise: " + citySunrise);

  const citySunset = currentConditions.sunset;
  console.log("sunset: " + citySunset);


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
 * Color changing weather
 *  Take each general weather condition
 *  Set color depending on that weather condition
 */