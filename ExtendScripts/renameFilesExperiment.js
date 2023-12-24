var project = app.project

// ein Object mit zwei Methoden
var coolObject = {
    name: "Cooles Objekt",

    myIndexOf: function (array, x) {
        var n=-1, N=array.length;
        while (++n<N && !(x.test(array[n])));
        return n<N ? n : -1;
        }
    ,

    sortClips: function () {
            return function (a,b) { 
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1
            }
            else if (a.toLowerCase() > b.toLowerCase()) {
                return 1
            }
            else return 0   
        }
    }
}

// Wir wählen einen Folder im Rootverzeichnis und ändern die Filenamen die einer bestimmten Konvention folgen


var zaehler = 0
var clipArray = []


// Hier können wir den Ordner im Root-Verzeichnis wählen indem die Files landen. In diesem Fall: 01_Master

for (var j=0; j < app.project.rootItem.children.length; j++) {
    //$.writeln(app.project.rootItem.children[j].name)
    if (app.project.rootItem.children[j].name == "01_Master") {
        var MasterFolder = app.project.rootItem.children[j]
    }
    
}

// Hier identifizieren wir die Files die wir finden und umbenennen wollen. In diesem Fall 5 Zahlen und Dateiendung für "00000.MTS"
// Für "C0001.mxf" muss das regex in /[A-Z]\d{3}/ geändert werden.
    
for (var i=0; i < MasterFolder.children.length; i++) {
    //$.writeln(app.project.rootItem.children[i].name);
    var clipName = MasterFolder.children[i].name
    if (MasterFolder.children[i].type == ProjectItemType.CLIP) {
        clipArray.push(clipName)
        clipArray.sort(coolObject.sortClips())
        var nameArray = clipName.split(".")
        var regex = /\d{5}/
        //$.writeln(coolObject.myIndexOf(nameArray, "C001"))
        if (coolObject.myIndexOf(nameArray, regex) == 0) {
            nameArray[0] = "DavidFile" + zaehler
            zaehler++
            MasterFolder.children[i].name = nameArray.join(".")
        }
    }
}

$.writeln(clipArray.toString())
