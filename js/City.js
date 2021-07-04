// City class

class City {

  #name;
  #isOn;
  #geojson;
  #layer;
  #center;
  #markerSegments;

  constructor(name, geojson, center, markerSegments) {
    this.#name = name;
    this.#geojson = geojson;
    this.#isOn = false;
    this.#center = center;
    this.#markerSegments = markerSegments;
  }

  // accessors
  getIsOn() {
    return this.#isOn;
  }

  getName() {
    return this.#name;
  }

  getGeojson() {
    return this.#geojson;
  }

  getLayer() {
    return this.#layer;
  }

  getCenter() {
    return this.#center;
  }

  getMarkerSegment(num) {
    return this.#markerSegments[num];
    //if (num < markerSegments.length);
    //else return null;
  }

  // mutators
  setIsOn(newIsOn) {
    this.#isOn = newIsOn;
  }

  setName(newName) {
    this.#name = newName;
  }

  setLayer(newLayer) {
    this.#layer = newLayer;
  }

  setCenter(newCenter) {
    this.#center = newCenter;
  }


}
