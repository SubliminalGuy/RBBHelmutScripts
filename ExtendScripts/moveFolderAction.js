var jobName = "Patrick Helmut"  // hier müsste {job.name} stehen
var rootFolderName = "02_Material"
var subFolderName = "VPMS"

var anzahlRootItems = app.project.rootItem.children.numItems


// Die erste Funktion findet die BIN "VPMS" im "02_Material"-Ordner

function findVPMSBin() {
    var myVariables = []
    for (var i=0; i<anzahlRootItems; i++) {
        var folderName = app.project.rootItem.children[i].name
        if (folderName == rootFolderName) {
        
            if(app.project.rootItem.children[i].children != null && app.project.rootItem.children[i].children.numItems>0) {
                for (var j=0; j< app.project.rootItem.children[i].children.numItems; j++) {
                    if (app.project.rootItem.children[i].children[j].name == subFolderName) {
                        myVariables.push(i)
                        myVariables.push(j)
                    }
                }
            }
        }
    }
    return myVariables

}

var binIdentifier = findVPMSBin()

// Die zweite Funktion schiebt den Ordner mit dem Namen {jobName} in die BIN "02_Material/VPMS"

function moveBin() {
    for (var k=0; k<anzahlRootItems; k++) {
        var folderName = app.project.rootItem.children[k].name
        if (folderName == jobName) {
            app.project.rootItem.children[k].moveBin(app.project.rootItem.children[binIdentifier[0]].children[binIdentifier[1]])
            
        }
    }
}

moveBin()