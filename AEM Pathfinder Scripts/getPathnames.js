
"use strict";

const aemJson = require("./data.js")


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Definiere unseren Datensatz als das Object das "rbb24" als Text enthält

var dataSet = findObjectByKey(aemJson.body, "text", "rbb24"); 

// extrahiere die Audio-Pfade aus zwei Dimensionen und schreibe sie in ein Array

var audioPaths = dataSet.items[0].items.map(function (item) {
  if (item.items) {
    return item.items.map(function (el) {
      return ["Audio " + el.text];
    });
  } else {
    return ["Audio " + item.text];
  }
}); 


// Flache das Array in eine Dimension ab

var audioArray = [audioPaths[0]];
audioArray.push.apply(audioArray, _toConsumableArray(audioPaths[1])); // extrahiere die Sport-Pfade und schreibe sie in ein Array

var sportArray = dataSet.items[1].items.map(function (item) {
  return ["Sport " + item.text];
}).reverse(); // extrahiere die Video-Pfade und schreibe sie in ein Array

var videoArray = dataSet.items[2].items.map(function (item) {
  return ["Video " + item.text];
}); 


// Füge alle Array in ein PfadArray zusammen

var pathArray = [].concat(_toConsumableArray(videoArray), audioArray, _toConsumableArray(sportArray));
console.log(pathArray); 


// Funktion für das Auffinden eines Objects in einem Array anhand des Values

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }

  return null;
}




