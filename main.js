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
  console.log(jsonSearch);


})



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