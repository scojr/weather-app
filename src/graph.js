import { formatGraphTime } from "./date-handler";

export class Graph {
  constructor(object) {
    console.log(object);
    this.temps = [];
    this.times = [];
    object.forEach((data) => {
      this.temps.push(data.temp);
      this.times.push(data.time);
    })
    this.tempsNormalized = this.normalizeTemps();
    this.timesFormatted = this.formatTimes()
    console.log(this.tempsNormalized);
    console.log(this.timesFormatted);
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
    const graph = this.getUlElement();
    const graphLabels = this.getLabelsOf();
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
      console.log(counter);
      timeLabelContainer.append(label);
    })
  }

  getLabelsOf() {
    const labelList = document.createElement('ul')
    labelList.classList.add('label-list');
    let counter = 2;
    this.temps.forEach((data) => {
      const indexOfData = this.temps.indexOf(data);
      const label = document.createElement('li');
      label.dataset.value = data;
      label.setAttribute('style', `--normalized-value: ${this.tempsNormalized[indexOfData]}%`)
      label.textContent = Math.round(data);
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

  getUlElement() {
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
}

function tweakPreviousValue(previousValue, value) {
  if (previousValue > value) {
    return previousValue - 1;
  } else if (previousValue === value) {
    return previousValue;
  } else {
    return previousValue + 1;
  }

}