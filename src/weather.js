import { getLocation, location } from "./location";
import { today, add7Days, getDayFromDate } from "./date-handler";

const key = "TDN8ACSEEJLR32KZURV9PT8Q6";

let currentConditions;
let dailyForecast;

export async function getWeather(query) {
  try {
    const API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/${today}/${add7Days}?key=${key}`
    const response = await fetch(API);
    const data = await response.json();
    const location = await getLocation(data.latitude, data.longitude);
    function dailyData() {
      return data.days;
    };
    currentConditions = getCurrentConditions(data);
    dailyForecast = get7DayForecast(data);
    return { dailyData, currentConditions, dailyForecast };
  } catch (error) {
    console.error(error);
  }
}

function getCurrentConditions(data) {
  const alerts = data.alerts;
  const conditions = data.currentConditions.conditions;
  const icon = data.currentConditions.icon;
  const temp = Math.round(data.currentConditions.temp);
  const tempMax = Math.round(data.days[0].tempmax);
  const tempMin = Math.round(data.days[0].tempmin);
  const feelsLike = Math.round(data.currentConditions.feelslike);
  const precipProb = data.currentConditions.precipprob;
  const humidity = Math.round(data.currentConditions.humidity);
  const windDir = data.currentConditions.winddir;
  const windSpeed = data.currentConditions.windspeed;
  const visibility = data.currentConditions.visibility;
  const uvIndex = data.currentConditions.uvindex;
  return { alerts, location, conditions, icon, temp, tempMax, tempMin, feelsLike, precipProb, humidity, windDir, windSpeed, visibility, uvIndex }
}


function getForecastOfDay(input) {
  const date = input.datetime;
  const weekday = getDayFromDate(date);
  const icon = input.icon;
  const tempMax = Math.round(input.tempmax);
  const tempMin = Math.round(input.tempmin);
  const conditions = input.conditions;
  const day = { date, weekday, icon, tempMax, tempMin, conditions }
  return day;
}

function get7DayForecast(data) {
  const days = [];
  const daysData = data.days.slice(1);
  daysData.forEach((day) => days.push(getForecastOfDay(day)));
  return days;
}