var themeObject = {node.result.52b7c781-a3c9-44b1-95f3-843684b1e2bd}

var dateArray = Object.keys(themeObject)
var listOfProjects = ""

for (var i=0; i < dateArray.length; i++) {
    var singleArray = themeObject[dateArray[i]]
    
    for (var j=0; j<singleArray.length; j++) {
        listOfProjects += singleArray[j][0]
        listOfProjects += ","
    }   
}

listOfProjects