var aemJson = require('./data.js')





// Definiere unseren Datensatz als das Object das "rbb24" als Text enthält
var dataSet = findObjectByKey(aemJson.body, "text", "rbb24")



// extrahiere die Audio-Pfade aus zwei Dimensionen und schreibe sie in ein Array
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

// Flache das Array in eine Dimension ab
var audioArray = [audioPaths[0]]
audioArray.push(...audioPaths[1])

// extrahiere die Sport-Pfade und schreibe sie in ein Array
var sportArray = dataSet.items[1].items.map(item => {
    var key = "Sport " + item.text
    return {[key] : item.path}
} )

// extrahiere die Video-Pfade und schreibe sie in ein Array
var videoArray = dataSet.items[2].items.map(item => {
    var key = "Video " + item.text
    return {[key] : item.path}
} )


var pathArray = [...videoArray,...audioArray, ...sportArray]

var pathObject = {...pathArray}


console.log(pathObject)

// Funktion für das Auffinden eines Objects in einem Array anhand des Values
function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}





*/