// Initialize Project

var project = app.project
var ticks = 254016000000    

// erzeugt ein Array der Asset-Namen aus dem Asset-Array der Composition

var clipNameArray = []

function searchAssets(clipId, assets) {
for (var i = 0; i < assets.length; i++) {
    if (assets[i]["id"].indexOf(clipId) == 0) {
    return assets[i].name
    }
}
}

function getClipNames(segments, assets) {
for (var i=0; i < segments.length; i++) {
    clipNameArray.push(segments[i].assetId)
}
for (var j=0; j < clipNameArray.length; j++) {
    var realName = searchAssets(clipNameArray[j], assets)
    clipNameArray[j] = realName
}
return clipNameArray
}

clipNameArray = getClipNames(segments, assets)

// erzeugt ein Array aus Start- und Endzeiten aus dem segments-Array der Composition

var startAndEndTimes = []

function getArrayOfStartAndEndTimes(segments) {
for (var i=0; i < segments.length; i++) {
    startAndEndTimes.push([segments[i].start,segments[i].end])
}
return startAndEndTimes
}

startAndEndTimes = getArrayOfStartAndEndTimes(segments)

// findet die MaterialBin

function findMaterialBin() {
    for (var i=0; i < project.rootItem.children.numItems; i++) {
        if (project.rootItem.children[i].name == "02_Material") {
            return project.rootItem.children[i]
        }
    }
}

// findet die gesuchten Assets in der MaterialBin

function findAssetByName(name) {
    var materialBin = findMaterialBin()
    for (var z = 0; z < materialBin.children.numItems; z++ ) {
        if (materialBin.children[z].name == name ) {
            return materialBin.children[z]
        }
    }
}

// Identifiziert dann den ersten Clip und setzt the in- und out-points

var firstClip = findAssetByName(clipNameArray[0])

firstClip.setInPoint((startAndEndTimes[0][0]*ticks).toString(),4)
firstClip.setOutPoint((startAndEndTimes[0][1]*ticks).toString(),4)

// Erzeugt die initiale Sequence mit dem ersten Clip
project.createNewSequenceFromClips("AI Sequence", firstClip,project.rootItem)

// setzt den active Track auf den ersten Video-Track der aktiven Sequence
var activeTrack = project.activeSequence.videoTracks[0]

// loop durch die restlichen Assets, setzt in und out und schneidet sie in die Timeline

for (var i = 1; i < clipNameArray.length; i++) {
    var actualClip = findAssetByName(clipNameArray[i])
    actualClip.setInPoint((startAndEndTimes[i][0]*ticks).toString(),4)
    actualClip.setOutPoint((startAndEndTimes[i][1]*ticks).toString(),4)
    var actualEnd = project.activeSequence.end
    activeTrack.insertClip(actualClip, actualEnd.toString())
}

