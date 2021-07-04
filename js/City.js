// City class

class City {

  #name;
  #isOn;
  #geojson;
  #layer;
  #center;
  #cityMarker;
  #markerType;
  #r1;
  #r2;
  #r3;
  #r4;
  #numTracts;

  #pieHTML;
  #targetHTML;

  constructor(name, geojson, center, r1, r2, r3, r4, numTracts) {
    this.#name = name;
    this.#geojson = geojson;
    this.#isOn = false;
    this.#center = center; // central coordinates
    //this.#cityMarker = new CityMarker(this.#name, r1, r2, r3, r4, numTracts);
    this.#r1 = r1;
    this.#r2 = r2;
    this.#r3 = r3;
    this.#r4 = r4;
    this.#numTracts = numTracts;
    makePieHTML();
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
    //return this.#cityMarker.getHTML(markerType);
    if (markerType == "pie") return this.#pieHTML;
    else if (markerType == "target") return this.#targetHTML;
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

  makePieHTML() {
    var total = this.#r1 + this.#r2 + this.#r3 + this.#r4;
    var percR1 = getPercent(this.#r1, total);
    var percR2 = getPercent(this.#r2, total) + percR1;
    var percR3 = getPercent(this.#r3, total) + percR2;
    var percR4 = getPercent(this.#r4, total) + percR4;

    this.#pieHTML = '<div class="pie" id="cityMarkerIcon" style="background: conic-gradient(#E81D26 0% ' + percR1 + '%, #FFF81F ' +
    percR1 + '% ' + percR2 + '%, #5EC2EF ' + percR2 + '% ' + percR3 + '%, #0FB223 ' + percR3 + '% ' + percR4 + '% );"></div><h4>' + this.#name + '</h4>';
  }

  getPercent(pop, totalPop) {
    var percent = (pop/totalPop)*100;
    return percent;
  }


}
