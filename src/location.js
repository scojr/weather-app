import { getWeather } from "./weather";

const key = 'pk.ea5da1727d291e1be0e711db8013fd10'

export let location;

function setLocation(data) {
  const state = data.address.state;
  const city = data.address.city;
  return { state, city };
}

export async function getLocation(lat, lon) {
  try {
    const API = `https://us1.locationiq.com/v1/reverse?key=${key}&lat=${lat}&lon=${lon}&format=json`
    const response = await fetch(API);
    const data = await response.json();
    console.log(data);
    location = setLocation(data);
  } catch {
    location = error();
    function error() {
      const state = "Error";
      const city = "Error";
      return { state, city };
    }
  }
}