// Layer class

class Layer {

  #id;
  #mapped; // either true or false
  #functionOEF;
  #functionPaint;
  #layerName;


  constructor(id, functionOEF, functionPaint, layer) {
    this.#name = id;
    this.#functionOEF = functionOEF;
    this.#functionPaint = functionPaint;
    this.#layerName = layerName;
    this.#mapped = false;

  }

  // accessors
  getId() {
    return this.#id;
  }

  getMapped() {
    return this.#mapped;
  }

  getFunctionOEF() {
    return this.#functionOEF;
  }

  getFunctionPaint() {
    return this.#functionPaint;
  }

  getLayer() {
    return this.#layer;
  }

  getButtonID() {
    return this.#id + "Btn";
  }

  setMapped(status) { // either true or false
    this.#mapped = status;
  }


}
