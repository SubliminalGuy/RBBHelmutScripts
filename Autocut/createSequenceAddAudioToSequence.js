// ACHTUNG!
// DER CODE HIER WIRD PRODUKTIV GENUTZT. BITTE VOR AENDERUNG mit david.schwertgen@rbb-online.de oder tobias.pietschmann@rbb-online.de SPRECHEN !!!!
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Initialize Project

var project = app.project;
var ticks = 254016000000;

// erzeugt ein Array der Asset-Namen aus dem Asset-Array der Composition

var clipNameArray = [];

function searchAssets(clipId, assets) {
  for (var i = 0; i < assets.length; i++) {
    if (assets[i]["id"].indexOf(clipId) == 0) {
      return assets[i].name;
    }
  }
}

function getClipNames(segments, assets) {
  for (var i = 0; i < segments.length; i++) {
    clipNameArray.push(segments[i].assetId);
  }
  for (var j = 0; j < clipNameArray.length; j++) {
    var realName = searchAssets(clipNameArray[j], assets);
    clipNameArray[j] = realName;
  }
  return clipNameArray;
}

clipNameArray = getClipNames(segments, assets);

// erzeugt ein Array aus Start- und Endzeiten aus dem segments-Array der Composition

var startAndEndTimes = [];

function getArrayOfStartAndEndTimes(segments) {
  for (var i = 0; i < segments.length; i++) {
    startAndEndTimes.push([
      segments[i].start.toFixed(0),
      segments[i].end.toFixed(0),
    ]);
  }
  return startAndEndTimes;
}

startAndEndTimes = getArrayOfStartAndEndTimes(segments);

// findet die MaterialBin

function findMaterialBin() {
  for (var i = 0; i < project.rootItem.children.numItems; i++) {
    if (project.rootItem.children[i].name == "02_Material") {
      return project.rootItem.children[i];
    }
  }
}

// findet die VPMS-Bin in MaterialBin

function findVPMSBin(materialBin) {
  //var materialBin = findMaterialBin()
  for (var i = 0; i < materialBin.children.numItems; i++) {
    if (materialBin.children[i].name == "VPMS") {
      return materialBin.children[i];
    }
  }
}

// findet die gesuchten Assets in der MaterialBin oder der VPMS Bin

function findAssetByName(name) {
  var materialBin = findMaterialBin();
  var vpmsBin = findVPMSBin(materialBin);
  var searcher = "";
  for (var z = 0; z < materialBin.children.numItems; z++) {
    if (materialBin.children[z].name == name) {
      searcher = materialBin.children[z];
    }
  }
  if (!searcher) {
    for (var a = 0; a < vpmsBin.children.numItems; a++) {
      if (vpmsBin.children[a].name == name) {
        searcher = vpmsBin.children[a];
      }
    }
  }
  return searcher;
}

// Identifiziert dann den ersten Clip und setzt the in- und out-points

var firstClip = findAssetByName(clipNameArray[0]);

firstClip.setInPoint((startAndEndTimes[0][0] * ticks).toString(), 4);
firstClip.setOutPoint((startAndEndTimes[0][1] * ticks).toString(), 4);

// Erzeugt die initiale Sequence mit dem ersten Clip
project.createNewSequenceFromClips(tagName, firstClip, project.rootItem);

// setzt den active Track auf den ersten Video-Track der aktiven Sequence
var activeTrack = project.activeSequence.videoTracks[0];

// loop durch die restlichen Assets, setzt in und out und schneidet sie in die Timeline

for (var i = 1; i < clipNameArray.length; i++) {
  var actualClip = findAssetByName(clipNameArray[i]);
  actualClip.setInPoint((startAndEndTimes[i][0] * ticks).toString(), 4);
  actualClip.setOutPoint((startAndEndTimes[i][1] * ticks).toString(), 4);
  var actualEnd = project.activeSequence.end;
  activeTrack.insertClip(actualClip, actualEnd.toString());
}

// HIER BEGINNT DER AUDIO-PART DES SKRIPTS

// Ermittelt die ID des verwendeten Voice-Over-Assets

var voiceOverAssetId;

function getVoiceOverAssetId(assets) {
  for (var i = 0; i < assets.length; i++) {
    if (assets[i].name == "voice-over-asset") {
      voiceOverAssetId = assets[i].id;
    }
  }
  return voiceOverAssetId;
}

voiceOverAssetId = getVoiceOverAssetId(assets);

// findet den Watchfolder-Ordner in der MaterialBin

var soundtrackAssetName = voiceOverAssetId + ".mp3";

function findWatchfolderBin() {
  var materialBin = findMaterialBin();
  for (var z = 0; z < materialBin.children.numItems; z++) {
    if (materialBin.children[z].name == "von_Watchfolder") {
      return materialBin.children[z];
    }
  }
}

// findet das gesuchte Soundtrack-Asset in der WatchfolderBin
function findSoundtrackAsset(name) {
  var watchfolderBin = findWatchfolderBin();
  for (var z = 0; z < watchfolderBin.children.numItems; z++) {
    if (watchfolderBin.children[z].name == name) {
      return watchfolderBin.children[z];
    }
  }
}

var soundtrackClip = findSoundtrackAsset(soundtrackAssetName);

// setzt den voiceOver-Track auf die dritte Audiospur der aktiven Sequence
var voiceOverTrack = project.activeSequence.audioTracks[2];

voiceOverTrack.insertClip(soundtrackClip, soundtrackArray[0].offsetStart);
