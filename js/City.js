// City class

import CityMarker from "CityMarker";

class City {

  #name;
  #isOn;
  #geojson;
  #layer;
  #center;
  #cityMarker;
  #markerType;

  constructor(name, geojson, center, r1, r2, r3, r4, numTracts) {
    this.#name = name;
    this.#geojson = geojson;
    this.#isOn = false;
    this.#center = center; // central coordinates
    this.#cityMarker = new CityMarker(this.#name, this.#center, r1, r2, r3, r4, numTracts);
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

  getCityMarkerHTML(markerType) {
    setMarkerType(markerType);
    return this.#cityMarker.getHTML(markerType);
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
