import { getWeather } from "./weather";

const key = 'pk.ea5da1727d291e1be0e711db8013fd10'

export let location;

function setLocation(data) {
  const state = data.address.state;
  const city = data.address.city;
  return { state, city };
}

export async function getLocation(lat, lon) {
  const API = `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${lon}&format=json`
  const response = await fetch(API);
  const data = await response.json();
  console.log(data);
  location = setLocation(data);
}

// export async function searchLocation(query) {
//   const API = `https://us1.locationiq.com/v1/search?key=${key}&q=${query}&format=json`
//   const response = await fetch(API)
//   const data = await response.json();
//   queryResponse = data[0];
//   console.log(data);
//   const lat = data.lat;
//   const lon = data.lon;
//   getWeather(lat, lon);
// }

// searchLocation("new york city");