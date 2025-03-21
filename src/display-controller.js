import dom from "./dom-interface";

export function initiateDisplayController() {
  const currentConditions = new CurrentConditions(document.querySelector(".primary"));
  return { currentConditions }
}

class CurrentConditions {
  constructor(containerElement) {
    this.root = containerElement;
    this.currentTemp = new TextElement(this.root.querySelector(".current-temp"))
  }
}

class TextElement {
  constructor(element) {
    this.text = element;
  }
  setText(string) {
    this.text.textContent = string;
  }
}