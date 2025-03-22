import { constructFrom } from "date-fns/fp";
import { getTodaysDate, getTime, today } from "./date-handler";
import { getWeather } from "./weather";
import dom from "./dom-interface";
import { Graph } from "./graph";

setWeatherResults();

async function setWeatherResults() {
  const result = await getWeather();
  setHeader(result.currentConditions);
  setCurrentConditions(result.currentConditions);
  setDailyForecast(result.dailyForecast);
  drawGraph(formatHoursForGraph(result.dailyData()));
}

setInterval(setTime, 1000)
let isCelsius = false;
let isChartPrecip = false;

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

  if (isCelsius) {
    set.currentTemp.style.setProperty('--unit', `"${'C'}"`);
  } else {
    set.currentTemp.style.setProperty('--unit', `"${'F'}"`);
  }

  set.currentTemp.textContent = convertCheck(input.temp);
  set.feelsLikeValue.textContent = convertCheck(input.feelsLike);
  set.todayHighValue.textContent = convertCheck(input.tempMax);
  set.todayLowValue.textContent = convertCheck(input.tempMin);
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
    day.textContent = convertCheck(input[index].tempMax);
  })
  set.forecastLows.forEach((day, index) => {
    day.textContent = convertCheck(input[index].tempMin);
  })
}

export function formatHoursForGraph(input) {
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
    hours.push(new Hour(hour.datetime, hour.temp, hour.precipprob));
  })
  const graph = new Graph(hours, isChartPrecip);
  const graphElement = document.querySelector('.hourly-forecast');
  const timeLabels = document.querySelector('.time-labels');
  graph.addGraphToDOMElement(graphElement, timeLabels);
}

class Hour {
  constructor(time, temp, precipProb) {
    this.time = time;
    this.temp = temp;
    this.precipProb = precipProb;
  }
}

const fahrenheitButton = document.querySelector(".temp-button.fahrenheit");
const celsiusButton = document.querySelector(".temp-button.celsius");

fahrenheitButton.addEventListener("click", function fahrenheitButtonClick(e) {
  if (isCelsius) {
    isCelsius = false;
    celsiusButton.classList.remove("active");
    fahrenheitButton.classList.add("active");
    setWeatherResults();
  }
})


celsiusButton.addEventListener("click", function celsiusButtonClick(e) {
  if (!isCelsius) {
    isCelsius = true;
    fahrenheitButton.classList.remove("active");
    celsiusButton.classList.add("active");
    setWeatherResults();
  }
})

export function convertCheck(unit) {
  if (isCelsius) {
    return Math.round((unit - 32) * 5 / 9);
  }
  else return Math.round(unit);
}

const chartTempButton = document.querySelector(".temp-button.chart");
const chartPrecipButton = document.querySelector(".precip-button.chart");

chartTempButton.addEventListener("click", function tempButtonClick(e) {
  if (isChartPrecip) {
    isChartPrecip = false;
    chartPrecipButton.classList.remove("active");
    chartTempButton.classList.add("active");
    setWeatherResults();
  }
})

chartPrecipButton.addEventListener("click", function precipButtonClick(e) {
  if (!isChartPrecip) {
    isChartPrecip = true;
    chartTempButton.classList.remove("active");
    chartPrecipButton.classList.add("active");
    setWeatherResults();
  }
})