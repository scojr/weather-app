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
    const outline = this.getUlElement();
    outline.classList.add('outline');
    element.append(graph);
    element.append(outline);
  }

  getUlElement() {
    const ul = document.createElement('ul');
    ul.classList.add('graph');
    let previousValue;
    this.dataPointsNormalized.forEach((data) => {
      const li = document.createElement('li');
      li.setAttribute('style',
        `--value: ${data}%;
        --previous-value: ${(() => {
          if (typeof (previousValue) === "number") {
            return previousValue;
          } else {
            return data;
          }
        })()}%`)
      ul.append(li);
      previousValue = data;
    })
    return ul;
  }
}
