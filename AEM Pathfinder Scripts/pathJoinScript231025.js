var JSON = require('./AEM Pathfinder Scripts/allAEMPaths')

function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i];
    }
  }

  return null;
}

// Definiere unseren Datensatz als das Object das "rbb24" als Text enthält

var dataSet = findObjectByKey(JSON, "text", "rbb24"); 



// extrahiere die Video-Pfade und schreibe sie in ein Array
var videoArray = dataSet.items[2].items.map(item => {
    var key = "Video " + item.text
    return {[key] : item.path}
} )

// extrahiere die Sport-Pfade und schreibe sie in ein Array
var sportArray = dataSet.items[1].items.map(item => {
    var key = "Sport " + item.text
    return {[key] : item.path}
} )

//extrahiere die Audio-Pfade aus zwei Dimensionen und schreibe sie in ein Array
var audioPaths = dataSet.items[0].items.map(item => {
    if (item.items) {
        return item.items.map(el => {
            var key = "Audio " + el.text
            return {[key] : el.path}
        })
    }
    else {
        var key = "Audio " + item.text
        return { [key] : item.path}
    }
})


const pathArray = sportArray.concat(videoArray)

const resultObject = {};

pathArray.forEach(item => {
  for (const key in item) {
    resultObject[key] = item[key];
  }
});



console.log(resultObject)