import dom from "./dom-interface";
import { Graph } from "./graph";


export function setCurrentConditions(input) {
  const set = dom.currentConditons;

  import(`./weather-icons/${input.icon}.svg`).then((resolve) => {
    set.visual.src = resolve.default;
  })
  set.currentTemp.textContent = input.temp;
  set.feelsLikeValue.textContent = input.feelslike;
  set.todayHighValue.textContent = input.tempMax;
  set.todayLowValue.textContent = input.tempMin;
  set.precipitationValue.textContent = input.precipProb + '%';
  set.humidityValue.textContent = input.humidity + '%';
  set.windValue.textContent = input.windSpeed + ' mph';
  set.visibilityValue.textContent = input.visibility + ' miles';
  set.UVValue.textContent = input.uvIndex + ' / 11';
}

export function setDailyForecast(input) {
  const set = dom.dailyForecast;
  set.forecastVisuals.forEach((img, index) => {
    import(`./weather-icons/${input[index].icon}.svg`).then((resolve) => {
      img.src = resolve.default;
    })
  })
  set.dayLabels.forEach((day, index) => {
    day.textContent = input[index].weekday.slice(0, 3).toUpperCase();
  })
  set.forecastDescriptions.forEach((day, index) => {
    day.textContent = input[index].conditions;
  })
  set.forecastHighs.forEach((day, index) => {
    day.textContent = input[index].tempMax;
  })
  set.forecastLows.forEach((day, index) => {
    day.textContent = input[index].tempMin;
  })
}

drawGraph()

function drawGraph(...temps) {
  const graph = new Graph(72, 62, 55, 49, 47, 55, 26, 32, 11, 55, 0, 11);
  const graphElement = document.querySelector('.hourly-forecast');
  graph.addGraphToDOMElement(graphElement);
}
