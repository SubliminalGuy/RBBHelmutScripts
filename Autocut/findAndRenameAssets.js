// ACHTUNG! 
// DER CODE HIER WIRD PRODUKTIV GENUTZT. BITTE VOR AENDERUNG mit david.schwertgen@rbb-online.de oder tobias.pietschmann@rbb-online.de SPRECHEN !!!!
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



var project = app.project

// findet die MaterialBin

function findMaterialBin() {
    for (var i=0; i < project.rootItem.children.numItems; i++) {
        if (project.rootItem.children[i].name == "02_Material") {
            return project.rootItem.children[i]
        }
    }
}

// findet die VPMS-Bin in MaterialBin

function findVPMSBin(materialBin) {
    //var materialBin = findMaterialBin()
    for (var i=0; i < materialBin.children.numItems; i++) {
        if (materialBin.children[i].name == "VPMS") {
            return materialBin.children[i]
        }
    }
}



/**
 * Find the Material Bin and VPMS Bin, then loop through all the children of the Material Bin and VPMS
 * Bin, and if the nodeId of the child matches the nodeId passed into the function, then rename the
 * child to the newName passed into the function.
 */
function findAndRenameAssetByNodeId(nodeId, newName) {
    var matBin = findMaterialBin()
    var vpmsBin = findVPMSBin(matBin)
    for (var z = 0; z < matBin.children.numItems; z++ ) {
        if (matBin.children[z].nodeId == nodeId) {
            matBin.children[z].name = newName
        }
        else {
            for (var a = 0; a < vpmsBin.children.numItems; a++ ) {
                if (vpmsBin.children[a].nodeId == nodeId ) {
                    vpmsBin.children[a].name = newName
                }
            }
        }
    }
}



findAndRenameAssetByNodeId("000f431f", "AS_XberfXllte-PapierkXrbe_BerlinerAbendschau-FX-02108_09-09-1965_72759920_00-10-03-07-00-11-57-00_7")