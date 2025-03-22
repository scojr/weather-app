import "./style.css";
import { getWeather } from "./weather";
import { setHeader, setCurrentConditions, setDailyForecast, formatHourlyTemps, drawGraph } from "./display-controller";


async function setWeatherResults() {
  const result = await getWeather();
  setHeader(result.currentConditions);
  setCurrentConditions(result.currentConditions);
  setDailyForecast(result.dailyForecast);
  drawGraph(formatHourlyTemps(result.dailyData()));
}

const weather = setWeatherResults();