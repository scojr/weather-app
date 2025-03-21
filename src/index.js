import "./style.css";
import { getWeather } from "./weather";
import { setCurrentConditions, setDailyForecast } from "./display-controller";

async function setWeatherResults() {
  const result = await getWeather();
  console.log(result.currentConditions);
  console.log(result.dailyForecast);
  setCurrentConditions(result.currentConditions);
  setDailyForecast(result.dailyForecast);
}

const weather = setWeatherResults();