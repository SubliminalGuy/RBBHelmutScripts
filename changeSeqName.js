
var nameArray = [" xxxx_xx_xx  16_9 Stereo ", "bal xxxx_xx_xx  16_9 Stereo", "xxxx_xx_xx 1_1 Stereo  Beispielsequenz" ]
var partikelArray
module.exports = function changeSequenceName() {
  
  for (i=0; i < nameArray.length; i++) {
    console.log(nameArray[i])
    partikelArray = nameArray[i].split(" ")
    var xIndex = partikelArray.indexOf("xxxx_xx_xx")
    if (xIndex > -1) {
      partikelArray[xIndex] = "Projektname"
    }
    nameArray[i] = partikelArray.join(" ")
  }
  return nameArray
}



// array.prototpe.filter Polyfill


if (!Array.prototype.filter) {
  Array.prototype.filter = function(func, thisArg) {
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();

    let len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;
    if (thisArg === undefined) {
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func(t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = t[i];
          }
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}


