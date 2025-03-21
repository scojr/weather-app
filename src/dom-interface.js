const header = {
  locationSearch: document.querySelector(".location-search"),
  locationText: document.querySelector(".location-text"),
  date: document.querySelector(".date"),
  time: document.querySelector(".time"),
};

const currentConditons = {
  alert: document.querySelector(".primary-alert"),
  alertText: document.querySelector(".alert-text"),
  description: document.querySelector(".description-text"),
  visual: document.querySelector(".visual"),
  currentTemp: document.querySelector(".current-temp"),
  description: document.querySelector(".description-text"),
  feelsLikeValue: document.querySelector(".feels-like-value"),
  todayHighValue: document.querySelector(".today-high-value"),
  todayLowValue: document.querySelector(".today-low-value"),
  precipitationValue: document.querySelector(".precipitation-value"),
  humidityValue: document.querySelector(".humidity-value"),
  windValue: document.querySelector(".wind-value"),
  visibilityValue: document.querySelector(".visibility-value"),
  UVValue: document.querySelector(".uv-value"),
};

const dailyForecast = {
  dayLabels: document.querySelectorAll(".day-label"),
  forecastVisuals: document.querySelectorAll(".forecast-visual"),
  forecastDescriptions: document.querySelectorAll(".description"),
  forecastHighs: document.querySelectorAll(".forecast-high"),
  forecastLows: document.querySelectorAll(".forecast-low"),
};

const dom = {
  header,
  currentConditons,
  dailyForecast,
}

export default dom;