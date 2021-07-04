// City class

class City {

  #name;
  #isOn;
  #geojson;
  #layer;
  #center;
  #r1;
  #r2;
  #r3;
  #r4;
  #numTracts;

  constructor(name, geojson, center, r1, r2, r3, r4, numTracts) {
    this.#name = name;
    this.#geojson = geojson;
    this.#isOn = false;
    this.#center = center;
    this.#markerSegments = markerSegments;
    this.#r1 = r1;
    this.#r2 = r2;
    this.#r3 = r3;
    this.#r4 = r4;
    this.#numTracts = numTracts;
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

  getR1() {
    return this.#r1;
  }

  getR2() {
    return this.#r2;
  }

  getR3() {
    return this.#r3;
  }

  getR4() {
    return this.#r4;
  }

  getNumTracts() {
    return this.#numTracts;
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
