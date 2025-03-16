import { sampleQuery } from "./sample-data";
import { today, add7Days } from "./date-handler";

// const key = "TDN8ACSEEJLR32KZURV9PT8Q6";
// let location = "77840";
// const API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/${add7Days}?key=${key}`
let query;
let forecast;
let conditions;


export async function getWeather() {
  // const response = await fetch(API);
  // const data = await response.json();
  const data = sampleQuery;
  query = data;
  console.log(data);

  forecast = get7DayForecast();
  conditions = getCurrentConditions();
}

const currentConditions = {
  temp: function () {
    return query.currentConditions.temp;
  },
  precipitation: function () {
    return query.currentConditions.precip;
  },
}

function getCurrentConditions() {
  const conditions = query.currentConditions.conditions;
  const cloudcover = query.currentConditions.cloudcover;
  const temp = query.currentConditions.temp;
  const humidity = query.currentConditions.humidity;
  const feelslike = query.currentConditions.feelslike;
  const uvIndex = query.currentConditions.uvIndex;
  const precip = query.currentConditions.precip;
  const precipProb = query.currentConditions.precipprob;
  const precipType = query.currentConditions.preciptype;
  const snow = query.currentConditions.snow;
  const windDir = query.currentConditions.winddir;
  const windGust = query.currentConditions.windgust;
  const windSpeed = query.currentConditions.windspeed;
  const moonphase = query.currentConditions.moonphase;
  return { conditions, cloudcover, temp, humidity, feelslike, uvIndex, precip, precipProb, precipType, snow, windDir, windGust, windSpeed, moonphase }

}

function getForecastOfDay(input) {
  const date = input.datetime;
  const tempMax = input.tempmax;
  const tempMin = input.tempMin;
  const conditions = input.conditions;
  const precipProb = input.precipprob;
  const precipType = input.preciptype;
  const humidity = input.humidity;
  const windDir = input.winddir;
  const windGust = input.windgust;
  const windSpeed = input.windspeed;

  const day = { date, tempMax, tempMin, conditions, precipProb, precipType, humidity, windDir, windGust, windSpeed }

  return day;
}

function get7DayForecast() {
  const days = [];
  const daysData = query.days;
  daysData.forEach((day) => days.push(getForecastOfDay(day)));
  return days;
}

window.logConditions = function logCurrentConditions() {
  console.log({ forecast, conditions });
}