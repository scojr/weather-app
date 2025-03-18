export class Graph {
  constructor(...dataValues) {
    this.dataPoints = [];
    dataValues.forEach((data) => {
      this.addData(data);
    })
    this.dataPointsNormalized = this.normalizeData();
  }

  normalizeData() {
    const min = Math.min(...this.dataPoints);
    const max = Math.max(...this.dataPoints);

    if (max - min === 0) {
      return this.dataPoints.map(() => 1 / this.dataPoints.length);
    }
    return this.dataPoints.map(x => (x - min) / (max - min) * 100);
  }

  printData() {
    console.log(this.dataPoints);
  }

  addData(value) {
    this.dataPoints.push(value);
  }

  addGraphToDOMElement(element) {
    const graph = this.getUlElement();
    const graphLabels = this.getLabelsOf(graph);
    element.append(graph);
    element.append(graphLabels);
  }

  getLabelsOf(graph) {
    const labelList = document.createElement('ul')
    labelList.classList.add('label-list');
    this.dataPoints.forEach((data) => {
      const indexOfData = this.dataPoints.indexOf(data);
      const label = document.createElement('li');
      label.dataset.value = data;
      label.setAttribute('style', `--normalized-value: ${this.dataPointsNormalized[indexOfData]}%`)
      label.textContent = data;
      label.classList.add('label');
      labelList.append(label);
    })
    return labelList;
  }

  getUlElement() {
    const ul = document.createElement('ul');
    ul.classList.add('graph');
    let previousValue = this.dataPointsNormalized[0];
    this.dataPointsNormalized.slice(1).forEach((data) => {
      const li = document.createElement('li');
      li.setAttribute('style',
        `--value: ${data}%;
        --previous-value: ${previousValue}%`)
      ul.append(li);
      previousValue = data;
    })
    const graphContainer = document.createElement('div');
    graphContainer.classList.add('graph-container');
    graphContainer.append(ul);
    return graphContainer;
  }
}