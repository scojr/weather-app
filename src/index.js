import "./style.css";
import { getWeather } from "./weather";
import { Graph } from "./graph";

getWeather();


window.forecast = new Graph(72, 62, 55, 49, 47, 55);
forecast.printData();
const element = document.querySelector('.temp-chart');
forecast.addGraphToDOMElement(element);
console.log(forecast.normalizeData());