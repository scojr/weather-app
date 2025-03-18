import "./style.css";
import { getWeather } from "./weather";
import { initiateDisplayController } from "./display-controller";
import { Graph } from "./graph";

getWeather();


window.forecast = new Graph(72, 62, 55, 49, 47, 55);
const element = document.querySelector('.hourly-forecast');
forecast.addGraphToDOMElement(element);
console.log(forecast.normalizeData());
window.display = initiateDisplayController();