// CityMarker class

export default class CityMarker {

  #name;
  #r1;
  #r2;
  #r3;
  #r4;
  #numTracts;
  #targetHTML;
  #pieHTML;

  constructor(name, r1, r2, r3, r4, numTracts) {
    this.#r1 = r1;
    this.#r2 = r2;
    this.#r3 = r3;
    this.#r4 = r4;
    this.#numTracts = numTracts;
    makeTargetHTML();
    makePieHTML();
  }

  makeTargetHTML() {
    var sizeFactor = this.#numTracts*3;
    var styleStr = "";
    styleStr += "height: " + (this.#r1/sizeFactor)*100 + "px; ";
    styleStr += "width: " + (this.#r1/sizeFactor)*100 + "px; ";
    styleStr += "border-radius: 50%; background-color: #E81D26; ";
    styleStr += "border: " + (this.#r2/sizeFactor)*100 + "px solid #FFF81F; ";
    var boxShadow = "box-shadow: 0 0 0 ";
    boxShadow += (this.#r3/sizeFactor)*100 + "px #5EC2EF, 0 0 0 ";
    boxShadow += ((this.#r3/sizeFactor)*100 + (this.#r4/sizeFactor)*100) + "px #0FB223; \"";
    styleStr += boxShadow;

    this.#targetHTML = "<div id='cityMarkerIcon' style='" + styleStr + "' ></div><h4>" + this.#name + "</h4>";
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


  // accessors
  getHTML(markerType) {
    if (markerType == "target") return this.#targetHTML;
    else if (markerType == "pie") return this.#pieHTML;
  }

}
