import { constructFrom } from "date-fns/fp";
import { getTodaysDate, getTime, today } from "./date-handler";
import dom from "./dom-interface";
import { Graph } from "./graph";

setInterval(setTime, 1000)

export function setHeader(input) {
  const set = dom.header;
  set.locationText.textContent = `${input.location.city}, ${input.location.state}`
  set.date.textContent = getTodaysDate();
  setTime();
}

function setTime() {
  dom.header.time.textContent = getTime();
}

export function setCurrentConditions(input) {
  const set = dom.currentConditons;

  if (input.alerts[0]) {
    set.alertText = input.alerts[0]
    set.alert.style.display = "block";
  } else {
    set.alert.style.display = "none";
  }

  import(`./weather-icons/${input.icon}.svg`).then((resolve) => {
    set.visual.src = resolve.default;
  })
  set.currentTemp.textContent = input.temp;
  set.feelsLikeValue.textContent = input.feelsLike;
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

export function formatHourlyTemps(input) {
  const currentHour = new Date().getHours();
  const todaysHours = input[0].hours.slice(currentHour);
  if (todaysHours.length === 24) {
    return todaysHours;
  } else {
    const hoursDifference = 24 - todaysHours.length;
    const tomorrowsHours = input[1].hours.slice(0, hoursDifference);
    return todaysHours.concat(tomorrowsHours);
  }
}

export function drawGraph(object) {
  let hours = [];
  object.forEach((hour) => {
    hours.push(new Hour(hour.datetime, hour.temp));
  })
  const graph = new Graph(hours);
  const graphElement = document.querySelector('.hourly-forecast');
  const timeLabels = document.querySelector('.time-labels');
  graph.addGraphToDOMElement(graphElement, timeLabels);
}

class Hour {
  constructor(time, temp) {
    this.time = time;
    this.temp = temp;
  }
}