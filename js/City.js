// City class

class City {

  #name;
  #isOn;
  #geojson;
  #layer;
  #center;
  #cityMarker;

  constructor(name, geojson, center) {
    this.#name = name;
    this.#geojson = geojson;
    this.#isOn = false;
    this.#center = center;
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

  getCityMarker() {
    return this.#cityMarker;
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

  setCityMarker(newCityMarker) {
    this.#cityMarker = newCityMarker;
  }


}
