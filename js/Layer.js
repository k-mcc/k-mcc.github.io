// Layer class

class Layer {

  #id;
  #mapped; // either true or false
  #functionOEF;
  #functionPaint;
  #layerName;
  #storeLayer;

  constructor(id, layer) { //functionOEF, functionPaint,
    this.#name = id;
    //this.#functionOEF = functionOEF;
    //this.#functionPaint = functionPaint;
    this.#layer = layer;
    this.#mapped = false;
  }

  // accessors
  getId() {
    return this.#id;
  }

  getMapped() {
    return this.#mapped;
  }

  /*getFunctionOEF() {
    return this.#functionOEF;
  }

  getFunctionPaint() {
    return this.#functionPaint;
  }*/

  getLayer() {
    return this.#layer;
  }

  getButtonID() {
    return this.#id + "Btn";
  }

  getStoreLayer() {
    if (this.#storeLayer != null) return this.#storeLayer;
    else return "Error: this layer has not yet been added to the map.";
  }

  setMapped(status) { // either true or false
    this.#mapped = status;
  }

  setStoreLayer(storeLayer) { // either true or false
    this.#storeLayer = storeLayer;
  }


}
