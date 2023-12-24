
// Initialize Project

var project = app.project



// get Array of ClipNames 

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



// get Array of Start and End Times 

var startAndEndTimes = []

function getArrayOfStartAndEndTimes(segments) {
  for (var i=0; i < segments.length; i++) {
    startAndEndTimes.push([segments[i].start,segments[i].end])
  }
  return startAndEndTimes
}

startAndEndTimes = getArrayOfStartAndEndTimes(segments)



// createSubclipArray from ClipArray
function findAssetByName(name) {
    var materialBin = project.rootItem.children[1]
    for (var z = 0; z < materialBin.children.numItems; z++ ) {
        //alert(project.rootItem.children[1].children[0].name)
        if (materialBin.children[z].name == name ) {
            return materialBin.children[z]
        }
    }
}


/*
var subClipArray = []

function makeSubclipArray(subClips) {
    for (var y = 0; y < clipNameArray.length; y++) {
        var recentClip;
        var recentSubclip;
        recentClip = findAssetByName(clipNameArray[y])
        var recentStartTime = startAndEndTimes[y][0] 
        var recentEndTime = startAndEndTimes[y][1] 
        // ARGUMENTS: Name des Subclips, startZeit, endZeit, hasHardBundaries = False, takeVideo = true, takeAudio = true
        recentSubclip = recentClip.createSubClip(recentClip.name + "_" + y, recentStartTime, recentEndTime,0,1,1)
        subClips.push(recentSubclip)

    }
    return subClips
}

var arrayOfSubclips = makeSubclipArray(subClipArray)
*/




var recentClip = findAssetByName(clipNameArray[0])
var recentSubclip = recentClip.createSubClip(recentClip.name + "_" + 0,startAndEndTimes[0][0],startAndEndTimes[0][1],0,1,1)

var recentClip1 = findAssetByName(clipNameArray[1])
var recentSubclip1 = recentClip1.createSubClip(recentClip1.name + "_" + 1,startAndEndTimes[1][0],startAndEndTimes[1][1],0,1,1)
/*
var recentClip2 = findAssetByName(clipNameArray[2])
var recentSubclip2 = recentClip2.createSubClip(recentClip2.name + "_" + 2,startAndEndTimes[2][0],startAndEndTimes[2][1],0,1,1)

var recentClip3 = findAssetByName(clipNameArray[3])
var recentSubclip3 = recentClip3.createSubClip(recentClip3.name + "_" + 3,startAndEndTimes[3][0],startAndEndTimes[3][1],0,1,1)

var recentClip4 = findAssetByName(clipNameArray[4])
var recentSubclip4 = recentClip4.createSubClip(recentClip4.name + "_" + 4,startAndEndTimes[4][0],startAndEndTimes[4][1],0,1,1)

var recentClip5 = findAssetByName(clipNameArray[5])
var recentSubclip5 = recentClip5.createSubClip(recentClip5.name + "_" + 5,startAndEndTimes[5][0],startAndEndTimes[5][1],0,1,1)

//var recentClip6 = findAssetByName(clipNameArray[6])
//var recentSubclip6 = recentClip5.createSubClip(recentClip6.name + "_" + 6,startAndEndTimes[6][0],startAndEndTimes[6][1],0,1,1)

*/
var arrayOfSubclips = [recentSubclip,recentSubclip1]





// Create Sequence from Subclips ARGUMENTS : Name, clipArray, TargetBin
var testsequenz = project.createNewSequenceFromClips("AI-Sequence",arrayOfSubclips,project.rootItem.children[1])


