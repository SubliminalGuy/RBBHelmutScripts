// ACHTUNG!
// DER CODE HIER WIRD PRODUKTIV GENUTZT. BITTE VOR AENDERUNG mit david.schwertgen@rbb-online.de oder tobias.pietschmann@rbb-online.de SPRECHEN !!!!
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// https://github.com/SubliminalGuy/RBB-Helmut-MiniJobs/blob/master/ExtendScripts/extendScriptsCollection.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var path4ToCheck = "\\\\ad.rbb-online.de\\common\\VPMS\\01-Grafik\\";
var path5ToCheck = "\\\\sb-fbp-ist01.ad.rbb-online.de\\Transfer\\MoJo\\";
var path6ToCheck = "\\\\ad.rbb-online.de\\common\\VPMS\\08-Ingest\\";
var path8ToCheck = "\\\\ad.rbb-online.de\\common\\VPMS\\04-Autoren\\";
var path7ToCheck = "\\\\ad.rbb-online.de\\common\\VPMS\\00-Temp_Austausch\\";

function loadJson() {
  if (typeof JSON !== "object") {
    JSON = {};
  }
  (function () {
    "use strict";
    function f(e) {
      return e < 10 ? "0" + e : e;
    }
    function quote(e) {
      escapable.lastIndex = 0;
      return escapable.test(e)
        ? '"' +
            e.replace(escapable, function (e) {
              var t = meta[e];
              return typeof t === "string"
                ? t
                : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + e + '"';
    }
    function str(e, t) {
      var n,
        r,
        i,
        s,
        o = gap,
        u,
        a = t[e];
      if (a && typeof a === "object" && typeof a.toJSON === "function") {
        a = a.toJSON(e);
      }
      if (typeof rep === "function") {
        a = rep.call(t, e, a);
      }
      switch (typeof a) {
        case "string":
          return quote(a);
        case "number":
          return isFinite(a) ? String(a) : "null";
        case "boolean":
        case "null":
          return String(a);
        case "object":
          if (!a) {
            return "null";
          }
          gap += indent;
          u = [];
          if (Object.prototype.toString.apply(a) === "[object Array]") {
            s = a.length;
            for (n = 0; n < s; n += 1) {
              u[n] = str(n, a) || "null";
            }
            i =
              u.length === 0
                ? "[]"
                : gap
                ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]"
                : "[" + u.join(",") + "]";
            gap = o;
            return i;
          }
          if (rep && typeof rep === "object") {
            s = rep.length;
            for (n = 0; n < s; n += 1) {
              if (typeof rep[n] === "string") {
                r = rep[n];
                i = str(r, a);
                if (i) {
                  u.push(quote(r) + (gap ? ": " : ":") + i);
                }
              }
            }
          } else {
            for (r in a) {
              if (Object.prototype.hasOwnProperty.call(a, r)) {
                i = str(r, a);
                if (i) {
                  u.push(quote(r) + (gap ? ": " : ":") + i);
                }
              }
            }
          }
          i =
            u.length === 0
              ? "{}"
              : gap
              ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}"
              : "{" + u.join(",") + "}";
          gap = o;
          return i;
      }
    }
    if (typeof Date.prototype.toJSON !== "function") {
      Date.prototype.toJSON = function () {
        return isFinite(this.valueOf())
          ? this.getUTCFullYear() +
              "-" +
              f(this.getUTCMonth() + 1) +
              "-" +
              f(this.getUTCDate()) +
              "T" +
              f(this.getUTCHours()) +
              ":" +
              f(this.getUTCMinutes()) +
              ":" +
              f(this.getUTCSeconds()) +
              "Z"
          : null;
      };
      String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON =
          function () {
            return this.valueOf();
          };
    }
    var cx, escapable, gap, indent, meta, rep;
    if (typeof JSON.stringify !== "function") {
      escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      meta = {
        "\b": "\\b",
        "": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      };
      JSON.stringify = function (e, t, n) {
        var r;
        gap = "";
        indent = "";
        if (typeof n === "number") {
          for (r = 0; r < n; r += 1) {
            indent += " ";
          }
        } else if (typeof n === "string") {
          indent = n;
        }
        rep = t;
        if (
          t &&
          typeof t !== "function" &&
          (typeof t !== "object" || typeof t.length !== "number")
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": e });
      };
    }
    if (typeof JSON.parse !== "function") {
      cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      JSON.parse = function (text, reviver) {
        function walk(e, t) {
          var n,
            r,
            i = e[t];
          if (i && typeof i === "object") {
            for (n in i) {
              if (Object.prototype.hasOwnProperty.call(i, n)) {
                r = walk(i, n);
                if (r !== undefined) {
                  i[n] = r;
                } else {
                  delete i[n];
                }
              }
            }
          }
          return reviver.call(e, t, i);
        }
        var j;
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
          });
        }
        if (
          /^[\],:{}\s]*$/.test(
            text
              .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
              .replace(
                /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]"
              )
              .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
          )
        ) {
          j = eval("(" + text + ")");
          return typeof reviver === "function" ? walk({ "": j }, "") : j;
        }
        throw new SyntaxError("JSON.parse");
      };
    }
  })();
}

loadJson();

// NEUES SCRIPT: Ändere die Namen der Vorlagensequenzen mit dem Projektnamen

var anzahlSequenzen = app.project.sequences.numSequences;

function myIndexOf(array, x) {
  var n = -1,
    N = array.length;
  while (++n < N && array[n] !== x);
  return n < N ? n : -1;
}

function changeSeqNames(projectName) {
  for (i = 0; i < anzahlSequenzen; i++) {
    seqName = app.project.sequences[i].name;
    partikelArray = seqName.split(" ");
    var xIndex = myIndexOf(partikelArray, "xxxx_xx_xx");
    if (xIndex > -1) {
      partikelArray[xIndex] = projectName;
    }
    seqName = partikelArray.join(" ");
    app.project.sequences[i].name = seqName;
  }
  return seqName;
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NEUES SCRIPT: Mappt den Grafikpfad G:\\VPMS\\01-Grafik\\ auf \\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-01-Grafik\\, G:\VPMS\08-Ingest\ auf G:\\VPMS\\08-Ingest\\','\\\\Sp-isis01.ad.rbb-online.de\\data101$\\common\\088-08-Ingest\
// und G:\VPMS\14-MoJo auf \\\\sb-fbp-ist01.ad.rbb-online.de\\Transfer\\MoJo\\ wenn ein Asset in die Timeline gezogen wird
// Vorher wird geprüft ob das Asset überhaupt einen Mediapfad hat (Farbflächen haben z.B. keinen) oder es sich um eine sog. Einstellungsebene handelt.
// In diesen Fällen wird der Medienpfad nicht getauscht.

app.bind("onActiveSequenceTrackItemAdded", onTrackItemAdded);

/**
 * If the track item is not an adjustment layer and has a media path, replace the media path.
 */
function onTrackItemAdded(track, trackItem) {
  var mediaPath = trackItem.projectItem.getMediaPath();
  var hasMediaPath = true;
  if (mediaPath === "") {
    hasMediaPath = false;
  }
  var isAdjustmentLayer = trackItem.isAdjustmentLayer();
  if (!isAdjustmentLayer && hasMediaPath) {
    replaceMediaPath(trackItem);
  }
}

function replaceMediaPath(trackItem) {
  var graphicMojoAndIngestPathSwap = [
    ["G:\\VPMS\\01-Grafik\\", path4ToCheck],
    ["G:\\VPMS\\14-MoJo\\", path5ToCheck],
    ["G:\\VPMS\\08-Ingest\\", path6ToCheck],
    ["G:\\VPMS\\00-Temp_Austausch\\", path7ToCheck],
    ["G:\\VPMS\\04-Autoren\\", path8ToCheck],
  ];

  var newPath = trackItem.projectItem.getMediaPath();
  for (var k = 0; k < graphicMojoAndIngestPathSwap.length; k++) {
    newPath = newPath
      .split(graphicMojoAndIngestPathSwap[k][0])
      .join(graphicMojoAndIngestPathSwap[k][1]);
    trackItem.projectItem.changeMediaPath(newPath, true);
  }
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NEUES SCRIPT: Das folgende Script gibt ein Array aus, mit allen Assets die nicht in den Transfer Ordnern Helmut, dem VPMS Share, im Grafik- oder Mojo-Ordner liegen

var pathToCheck = "\\\\sb-fbp-ist01\\Transfer\\CNC\\Helmut\\Helmut4";
var path2ToCheck = "\\\\sb-fbp-ist01\\VPMS\\Ingest\\IN_MaterialPool";
var path3ToCheck = "\\\\sp-fbp-ist01\\VPMS\\Ingest\\IN_MaterialPool";
var path9ToCheck = "";

arrClipPaths = [];
arrClipNames = [];
CheckPathOfTimelineClips(app.project.activeSequence);

JSON.stringify(CheckPathOfTimelineClips(app.project.activeSequence));

function CheckPathOfTimelineClips(mysequence) {
  if (mysequence) {
    activeSequence = app.project.activeSequence;
    videoTracks = activeSequence.videoTracks;
    audioTracks = activeSequence.audioTracks;
    nameSeq = activeSequence.name;
    allSeq = app.project.sequences;
    var clipType = videoTracks;
    checkPath(clipType); //checkt alle Clips auf den vorhandenen VIDEOtracks und schreibt fehlende Clips ins Array arrClipPaths

    clipType = audioTracks;
    checkPath(clipType); //checkt alle Clips auf den vorhandenen AUDIOtracks und schreibt fehlende Clips ins Array arrClipPaths

    ReturnClipPaths(); //gibt alle Elemente des Arrays arrClipPaths aus
    return PathObjString;
  } else {
    return { message: "Keine aktive Sequenz vorhanden" };
  }
}

function checkPath(CLIP) {
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

/*
Wir suchen uns aus den im Projekt verwendeten Sequenzen die Sequenz heraus die wir exportiert haben. 
Sobald wie diese kennen, fragen wir die frameSizeVertical und frameSizeHorizontal ab und schicken diese weiter an die nächste Node.
*/

var projektSequenzen = app.project.sequences;

var anzahlSequenzen = app.project.sequences.numSequences;

function FrameSize(nodeId) {
  var eachID;
  for (i = 0; i < anzahlSequenzen; i++) {
    eachID = projektSequenzen[i].sequenceID;
    eachID = eachID.toString();
    if (eachID === nodeId) {
      var verticalSize = app.project.sequences[i].frameSizeVertical;
      verticalSize = verticalSize.toString();
      var horizontalSize = app.project.sequences[i].frameSizeHorizontal;
      horizontalSize = horizontalSize.toString();
      return horizontalSize + "X" + verticalSize;
    }
  }
}

/* Aus Autoimport-Stream
Loescht die s4M Datei in Premiere */

var toCheck = app.project.rootItem;
function s4mFile(s4MPfad) {
  for (var i = 0; i < toCheck.children.numItems; i++) {
    var name = toCheck.children[i].name;
    var nummer = toCheck.children[i].type;
    if (toCheck.children[i].type == "1") {
      var pfad = toCheck.children[i].getMediaPath("");
      if (pfad == s4MPfad) {
        var myBin = app.project.rootItem.createBin("delete");

        toCheck.children[i].moveBin(myBin);

        myBin.deleteBin();
        break;
      }
    }
  }
}

/* Aus Autoimport

Ordnet den importieren Bin inkl. Sequenz den Ordnern 
"VPMS"/ 02_Material zu

Denn Ordnung muss sein

NOCH NICHT AKTIV EINGEBUNDEN!!!
*/

var rootFolderName = "02_Material";
var subFolderName = "VPMS";

// Die erste Funktion findet die BIN "VPMS" im "02_Material"-Ordner
function findVPMSBin() {
  for (var i = 0; i < app.project.rootItem.children.numItems; i++) {
    var folderName = app.project.rootItem.children[i].name;
    if (folderName == rootFolderName) {
      var materialMaterialBin = app.project.rootItem.children[i];
      for (var j = 0; j < materialMaterialBin.children.numItems; j++) {
        if (materialMaterialBin.children[j].name == subFolderName) {
          return materialMaterialBin.children[j];
        }
      }
    }
  }
}
// var bins = ["02_Material", "VPMS"]
// var subBin = findBinRecursive(app.project.rootItem, bins)

// Die erste Funktion sucht rekursiv nach dem Ordner mit dem Namen {binNameArray}

function findBinRecursive(bin, binNameArray) {
  if (binNameArray.length != 0) {
    var currentBinName = binNameArray.shift();
    for (var i = 0; i < bin.children.numItems; i++) {
      var folderName = bin.children[i].name;
      if (folderName == currentBinName) {
        return findBinRecursive(bin.children[i], binNameArray);
      }
    }
  } else {
    return bin;
  }
}
// Die zweite Funktion schiebt den Ordner mit dem Namen {jobName} in die BIN "02_Material/VPMS"
function moveEditMateSequencesToVpmsBin(vpmsBin, jobName) {
  for (var i = 0; i < app.project.sequences.numSequences; i++) {
    var sequence = app.project.sequences[i];
    if (
      sequence.projectItem.treePath.indexOf(
        rootFolderName + "/" + subFolderName
      ) < 0
    ) {
      var vpmsOjectId = readMetadataFromProjectItem(
        "vpmsObjectId",
        sequence.projectItem
      );
      if (vpmsOjectId) {
        var bins = sequence.projectItem.treePath.split("\\");
        bins.shift();
        bins.shift();
        bins.pop();
        var binToMove = findBinRecursive(app.project.rootItem, bins);
        // Die folgende Schleife verschiebt die Sequence die von VPMS mitgekommen sind in eine Loeschbin und löscht diese anschliessend
        for (var k = 0; k < binToMove.children.numItems; k++) {
          if (binToMove.children[k].isSequence()) {
            var binSequenceIdentified = binToMove.children[k].name;
            var loeschBin = app.project.rootItem.createBin("Ok loeschen");
            binToMove.children[k].moveBin(loeschBin);
            loeschBin.deleteBin();
          }
        }

        binToMove.moveBin(vpmsBin, jobName);
      }
    }
  }
}

function moveBin(vpmsBin, jobName) {
  for (var k = 0; k < app.project.rootItem.children.numItems; k++) {
    var folderName = app.project.rootItem.children[k].name;
    if (folderName == jobName) {
      app.project.rootItem.children[k].moveBin(
        app.project.rootItem.children[binIdentifier[0]].children[
          binIdentifier[1]
        ]
      );
    }
  }
}

function readMetadataFromProjectItem(key, projectItem) {
  if (ExternalObject.AdobeXMPScript === undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
  }
  var ns = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
  var xmpObj = new XMPMeta(projectItem.getProjectMetadata());
  return xmpObj.getProperty(ns, key);
}
