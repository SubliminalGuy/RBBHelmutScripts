var pathToCheck = "\\\\sp-fbpkons-istb01\\Transfer\\CNC\\Helmut\\Helmut4"
var path2ToCheck = "\\\\sb-fbp-ist01\\VPMS\\Ingest\\IN_MaterialPool"
var path3ToCheck = "\\\\sp-fbp-ist01\\VPMS\\Ingest\\IN_MaterialPool"

var arrClipPaths = []
var arrClipNames = []
CheckPathOfTimelineClips(app.project.activeSequence)

JSON.stringify(CheckPathOfTimelineClips(app.project.activeSequence))



function CheckPathOfTimelineClips(mysequence) {
    if (mysequence) {
        activeSequence = app.project.activeSequence
        videoTracks = activeSequence.videoTracks
        audioTracks = activeSequence.audioTracks
        nameSeq = activeSequence.name
        allSeq = app.project.sequences
        var clipType = videoTracks
        checkPath(clipType);            //checkt alle Clips auf den vorhandenen VIDEOtracks und schreibt fehlende Clips ins Array arrClipPaths

        clipType = audioTracks;
        checkPath(clipType)             //checkt alle Clips auf den vorhandenen AUDIOtracks und schreibt fehlende Clips ins Array arrClipPaths

        ReturnClipPaths();              //gibt alle Elemente des Arrays arrClipPaths aus
        return PathObjString
    }


    else {
        return {"message":"Keine aktive Sequenz vorhanden"}
    }
}


function checkPath(CLIP) {
    for (var i = 0; i < CLIP.numTracks; i++) {
        var track = CLIP[i]
        var TrackClips = track.clips
        //var Anzclips = TrackClips.numItems
        for (var j = 0; j < TrackClips.numItems; j++) {
            var TrackClip = TrackClips[j]
            if (!TrackClip.disabled) {
                var PrItem = TrackClip.projectItem
                if (PrItem && PrItem.type == ProjectItemType.CLIP) {
                    //$.writeln(PrItem.name)
                    var clipPath = PrItem.getMediaPath()
                    var clipName = PrItem.name
                    var clipPathIndex = clipPath.indexOf(pathToCheck) // wenn der Pfad nicht dem pathToCheck enspricht wird -1 ausgegeben
                    var clipPath2Index = clipPath.indexOf(path2ToCheck)
                    var clipPath3Index = clipPath.indexOf(path3ToCheck)
                    if (clipPathIndex == -1 && clipPath2Index == -1 && clipPath3Index == -1 ) { //überprüft ob der Clip Pfad bereits im Array vorhanden ist, falls nicht wird er ans Ende gepusht     
                        for (var k = 0; k < arrClipPaths.length; k++) {
                            var arrCHECK
                            if (arrClipPaths[k] == clipPath) { arrCHECK = true; break }
                            else (arrCHECK = false)
                        }
                        if (!arrCHECK) { 
                            (arrClipPaths.push(clipPath));
                            (arrClipNames.push(clipName))
                        }
                    }
                }
            }
        }
    }
}
function ReturnClipPaths() {
    var PathObj ={}
    if (arrClipPaths.length > 0) {
        
        
        PathObj.Anzahl = arrClipPaths.length
        PathObj.Pfade = arrClipPaths
        PathObj.Names = arrClipNames
        PathObj.lastPath = "0"
    }
        
    else {
        PathObj.Anzahl = 0 
    }
        PathObjString = JSON.stringify(PathObj)
        PathObjString = PathObjString.replace(/\\\\/g,"/")
      
        return PathObjString
    }



