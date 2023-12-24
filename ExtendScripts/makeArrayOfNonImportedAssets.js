// Liste der externen Pfade

var path1ToCheck = "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-01-Grafik"
var path2ToCheck = "\\\\sb-fbp-ist01.ad.rbb-online.de\\Transfer\\MoJo"
var path3ToCheck = "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-08-Ingest"
var path4ToCheck = "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-00-Temp_Austausch\\"
var path5ToCheck = "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-04-Autoren\\"

var arrNonImportedAssets = []
var nonUniqueAssetPaths = makeArrayOfNonImportedAssets(app.project.activeSequence)

// filtert das Array mit nonUniqueAssets nach doppelten Pfaden und eliminiert Doppler
var uniqueAssetPaths = []

for(var i=0; i < nonUniqueAssetPaths.length; i++) {
    if(uniqueAssetPaths.indexOf(nonUniqueAssetPaths[i]) == -1) {
      uniqueAssetPaths.push(nonUniqueAssetPaths[i]);
    }
  }



// pusht alle Pfade die in der oben angegebenen Liste sind in das Array nonUniqueAssetPaths

function makeArrayOfNonImportedAssets(mysequence) {
    if (mysequence) {
        activeSequence = app.project.activeSequence
        videoTracks = activeSequence.videoTracks
        audioTracks = activeSequence.audioTracks
        var clipType = videoTracks
        checkPath(clipType);            //checkt alle Clips auf den vorhandenen VIDEOtracks 
        clipType = audioTracks;
        checkPath(clipType)            //checkt alle Clips auf den vorhandenen AUDIOtracks 
        return arrNonImportedAssets
    }


    else {
        return {"message":"Keine aktive Sequenz vorhanden"}
    }
}


function checkPath(CLIP) {
    for (var i = 0; i < CLIP.numTracks; i++) {
        var track = CLIP[i]
        var trackClips = track.clips
        //var Anzclips = TrackClips.numItems
        for (var j = 0; j < trackClips.numItems; j++) {
            var trackClip = trackClips[j]
            if (!trackClip.disabled) {
                var projectItem = trackClip.projectItem
                if (projectItem && projectItem.type == ProjectItemType.CLIP) {
                    //$.writeln(PrItem.name)
                    var clipPath = projectItem.getMediaPath()
                    var clipPath1Index = clipPath.indexOf(path1ToCheck) // wenn der Pfad nicht dem pathToCheck enspricht wird -1 ausgegeben
                    var clipPath2Index = clipPath.indexOf(path2ToCheck)
                    var clipPath3Index = clipPath.indexOf(path3ToCheck)
                    var clipPath4Index = clipPath.indexOf(path4ToCheck)
                    var clipPath5Index = clipPath.indexOf(path5ToCheck)

                    if (clipPath1Index > -1  || clipPath2Index > -1 || clipPath3Index > -1 || clipPath4Index > -1 || clipPath5Index > -1) {    
                        arrNonImportedAssets.push(clipPath)
                    }
                }
            }
        }
    }
}

