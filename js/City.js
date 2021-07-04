// City class

class City {

  #name;
  #isOn;
  #geojson;
  #layer;
  #center;
  #cityMarker;
  #markerType;

  #pieHTML;
  #targetHTML;

  constructor(name, geojson) {
    this.#name = name;
    this.#geojson = geojson;
    this.#isOn = false;
    //this.#cityMarker = new CityMarker(this.#name, r1, r2, r3, r4, numTracts);
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

  setMarkerType(newMarkerType) {
    this.#markerType = newMarkerType;
  }


}
