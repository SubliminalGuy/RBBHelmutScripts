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

    var zaehler = 0
    var clipArray = []

for (var i=0; i < app.project.rootItem.children.length; i++) {
    //$.writeln(app.project.rootItem.children[i].name);
    var clipName = app.project.rootItem.children[i].name
    if (app.project.rootItem.children[i].type == ProjectItemType.CLIP) {
        clipArray.push(clipName)
        clipArray.sort(coolObject.sortClips())
        var nameArray = clipName.split(".")
        var regex = /[A-Za-z]\d{3}/
        //$.writeln(coolObject.myIndexOf(nameArray, "C001"))
        if (coolObject.myIndexOf(nameArray, regex) == 0) {
            nameArray[0] = "DavidFile" + zaehler
            zaehler++
            app.project.rootItem.children[i].name = nameArray.join(".")
        }
    }
}

$.writeln(clipArray.toString())


// sort (return func())