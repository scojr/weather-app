import { formatGraphTime } from "./date-handler";
import { convertCheck } from "./display-controller";

export class Graph {
  constructor(object, precip) {
    this.precip = precip;
    this.temps = [];
    this.precipProb = [];
    this.times = [];
    object.forEach((data) => {
      this.temps.push(data.temp);
      this.precipProb.push(data.precipProb);
      this.times.push(data.time);
    })
    this.tempsNormalized = this.normalizeTemps();
    this.timesFormatted = this.formatTimes()
    console.log(this.precipProb);
  }



  normalizeTemps() {
    const roundTemps = this.temps.map((temp) => Math.round(temp));
    let roundTempsNormalized;
    const min = Math.min(...roundTemps);
    const max = Math.max(...roundTemps);

    if (max - min === 0) {
      return roundTemps.map(() => 1 / roundTemps.length).map((temp) => Math.round(temp));
    }
    return roundTemps.map(x => (x - min) / (max - min) * 100).map((temp) => Math.round(temp));
  }

  formatTimes() {
    return this.times.map((hour) => formatGraphTime(hour));
  }

  printData() {
    console.log(this.temps);
  }

  addData(value) {
    this.temps.push(value);
  }

  addGraphToDOMElement(graphContainer, timeLabelContainer) {
    graphContainer.innerHTML = '';
    timeLabelContainer.innerHTML = '';
    let graph;
    let graphLabels;
    if (this.precip) {
      graph = this.drawGraphPrecip();
      graphLabels = this.getLabelsOfPrecip();
    } else {
      graph = this.drawGraphTemp();
      graphLabels = this.getLabelsOfTemps();
    }
    graphContainer.append(graph);
    let counter = 2;
    graphContainer.append(graphLabels);
    this.timesFormatted.forEach((hour, index) => {
      const label = document.createElement("h4");
      label.textContent = hour;
      if (counter === 2) {
        counter = 0;
      } else {
        counter = counter + 1;
      }
      if (counter !== 1) {
        label.classList.add('hidden');
      }
      timeLabelContainer.append(label);
    })
  }

  getLabelsOfTemps() {
    const labelList = document.createElement('ul')
    labelList.classList.add('label-list');
    let counter = 2;
    this.temps.forEach((data) => {
      const indexOfData = this.temps.indexOf(data);
      const label = document.createElement('li');
      label.dataset.value = data;
      label.setAttribute('style', `--normalized-value: ${this.tempsNormalized[indexOfData]}%`)
      label.textContent = convertCheck(data);
      label.classList.add('label');
      if (counter === 2) {
        counter = 0;
      } else {
        counter = counter + 1;
      }
      if (counter !== 1) {
        label.classList.add('hidden');
      }
      labelList.append(label);
    })
    return labelList;
  }

  getLabelsOfPrecip() {
    const labelList = document.createElement('ul')
    labelList.classList.add('label-list');
    let counter = 2;
    this.precipProb.forEach((data) => {
      const label = document.createElement('li');
      label.dataset.value = data;
      label.setAttribute('style', `--normalized-value: ${data}%`)
      label.textContent = `${data}%`;
      label.classList.add('label');
      label.classList.add('precip');

      if (counter === 2) {
        counter = 0;
      } else {
        counter = counter + 1;
      }
      if (counter !== 1) {
        label.classList.add('hidden');
      }
      labelList.append(label);
    })
    return labelList;
  }

  drawGraphTemp() {
    const ul = document.createElement('ul');
    ul.classList.add('graph');
    let previousValue = this.tempsNormalized[0];
    this.tempsNormalized.slice(1).forEach((data) => {
      const li = document.createElement('li');
      li.setAttribute('style',
        `--value: ${data}%;
        --previous-value: ${previousValue}%`);
      ul.append(li);
      previousValue = data;
    })

    const graphContainer = document.createElement('div');
    graphContainer.classList.add('graph-container');
    graphContainer.append(ul);
    return graphContainer;
  }

  drawGraphPrecip() {
    const ul = document.createElement('ul');
    ul.classList.add('graph');
    ul.classList.add('precip');
    let previousValue = this.precipProb[0];
    this.precipProb.slice(1).forEach((data) => {
      const li = document.createElement('li');
      li.setAttribute('style',
        `--value: ${data}%;
        --previous-value: ${previousValue}%`);
      ul.append(li);
      previousValue = data;
    })

    const graphContainer = document.createElement('div');
    graphContainer.classList.add('graph-container');
    graphContainer.append(ul);
    return graphContainer;
  }
}