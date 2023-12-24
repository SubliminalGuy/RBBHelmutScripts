var pathToCheck = "\\\\sp-fbpkons-istb01\\Transfer\\CNC\\Helmut\\Helmut4";
var path2ToCheck = "\\\\sb-fbp-ist01\\VPMS\\Ingest\\IN_MaterialPool";
var path3ToCheck = "\\\\sp-fbp-ist01\\VPMS\\Ingest\\IN_MaterialPool";
var path4ToCheck =
  "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-01-Grafik";
var path5ToCheck = "\\\\sb-fbp-ist01.ad.rbb-online.de\\Transfer\\MoJo";
var path6ToCheck =
  "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-08-Ingest";
var path7ToCheck =
  "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-00-Temp_Austausch\\";
var path8ToCheck =
  "\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-04-Autoren\\";
var path9ToCheck = "D:\\Helmut Projekts";

arrClipPaths = [];
arrClipNames = [];
//CheckPathOfTimelineClips(app.project.activeSequence);

function checkLocalPathOfTimelineClips(mysequence) {
  if (mysequence) {
    activeSequence = app.project.activeSequence;
    videoTracks = activeSequence.videoTracks;
    audioTracks = activeSequence.audioTracks;
    nameSeq = activeSequence.name;
    allSeq = app.project.sequences;
    var clipType = videoTracks;
    checkLocalPath(clipType); //checkt alle Clips auf den vorhandenen VIDEOtracks und schreibt fehlende Clips ins Array arrClipPaths

    clipType = audioTracks;
    checkLocalPath(clipType); //checkt alle Clips auf den vorhandenen AUDIOtracks und schreibt fehlende Clips ins Array arrClipPaths

    ReturnClipPaths(); //gibt alle Elemente des Arrays arrClipPaths aus
    return PathObjString;
  } else {
    return { message: "Keine aktive Sequenz vorhanden" };
  }
}

function checkLocalPath(CLIP) {
  for (var i = 0; i < CLIP.numTracks; i++) {
    var track = CLIP[i];
    var TrackClips = track.clips;
    //var Anzclips = TrackClips.numItems
    for (var j = 0; j < TrackClips.numItems; j++) {
      var TrackClip = TrackClips[j];
      if (!TrackClip.disabled) {
        var PrItem = TrackClip.projectItem;
        if (PrItem && PrItem.type == ProjectItemType.CLIP) {
          //$.writeln(PrItem.name)

          var clipPath = PrItem.getMediaPath();
          var clipName = PrItem.name;
          var clipPathIndex = clipPath.indexOf(pathToCheck); // wenn der Pfad nicht dem pathToCheck enspricht wird -1 ausgegeben
          var clipPath2Index = clipPath.indexOf(path2ToCheck);
          var clipPath3Index = clipPath.indexOf(path3ToCheck);
          var clipPath4Index = clipPath.indexOf(path4ToCheck);
          var clipPath5Index = clipPath.indexOf(path5ToCheck);
          var clipPath6Index = clipPath.indexOf(path6ToCheck);
          var clipPath7Index = clipPath.indexOf(path7ToCheck);
          var clipPath8Index = clipPath.indexOf(path8ToCheck);
          var clipPath9Index = clipPath.indexOf(path9ToCheck);

          if (
            clipPathIndex == -1 &&
            clipPath2Index == -1 &&
            clipPath3Index == -1 &&
            clipPath4Index == -1 &&
            clipPath5Index == -1 &&
            clipPath6Index == -1 &&
            clipPath7Index == -1 &&
            clipPath8Index == -1 &&
            clipPath9Index == -1
          ) {
            //überprüft ob der Clip Pfad bereits im Array vorhanden ist, falls nicht wird er ans Ende gepusht
            for (var k = 0; k < arrClipPaths.length; k++) {
              var arrCHECK;
              if (arrClipPaths[k] == clipPath) {
                arrCHECK = true;
                break;
              } else arrCHECK = false;
            }
            if (!arrCHECK) {
              arrClipPaths.push(clipPath);
              arrClipNames.push(clipName);
            }
          }
        }
      }
    }
  }
}

function ReturnClipPaths() {
  var PathObj = {};
  if (arrClipPaths.length > 0) {
    PathObj.Anzahl = arrClipPaths.length;
    PathObj.Pfade = arrClipPaths;
    PathObj.Names = arrClipNames;
    PathObj.lastPath = "0";
  } else {
    PathObj.Anzahl = 0;
  }
  PathObjString = JSON.stringify(PathObj);
  PathObjString = PathObjString.replace(/\\\\/g, "/");
  return PathObjString;
}
