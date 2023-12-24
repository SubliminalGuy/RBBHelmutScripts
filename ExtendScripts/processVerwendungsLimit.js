//      ---------------------------------------------------------------------
//      Liefert Metadatenwert anhand eines Key und eines Projekt Objekts zurück

function readMetadataFromProjectItem(key, projectItem) {
  if (ExternalObject.AdobeXMPScript === undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
  }
  var ns = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
  var xmpObj = new XMPMeta(projectItem.getProjectMetadata());
  return xmpObj.getProperty(ns, key);
}

//      ----------------------------------------------------------------------
//      liefert die VPMS ID eines Projekt Objektes zurück

function getVPMSid(item) {
  var vpmsIDmeta = "";
  vpmsIDmeta += readMetadataFromProjectItem("vpmsObjectId", item);
  var vpmsIDarr = vpmsIDmeta.split("/");
  return vpmsIDarr[4];
}

//      -----------------------------------------------------------------------
//      Kürzt den übergebenen Namen auf maximal 30 Zeichen ein und ergänzt "..."

function CheckChars(wortToCheck) {
  var Wort = wortToCheck;
  var WortArray = Wort.split("");
  var WhiteList = "{helmut.variable.Whitelist}";
  var ListArray = WhiteList.split("");
  var AusgabeWort;
  var Check = new Boolean();
  if (WortArray[0] === "Ä") {
    AusgabeWort = "Ae";
    Check = "true";
  } else if (WortArray[0] === "Ü") {
    AusgabeWort = "Ue";
    Check = "true";
  } else if (WortArray[0] === "Ö") {
    AusgabeWort = "Oe";
    Check = "true";
  } else if (WortArray[0] === "ß") {
    AusgabeWort = "ss";
    Check = "true";
  } else if (WortArray[0] === " ") {
    AusgabeWort = "_";
    Check = "true";
  } else {
    for (j = 0; j < ListArray.length; j++) {
      if (WortArray[0] === ListArray[j]) {
        Check = "true";
        break;
      }
    }
    if (Check == "true") {
      AusgabeWort = WortArray[0];
    } else {
      AusgabeWort = "_";
    }
  }
  for (i = 1; i < WortArray.length; i++) {
    if (WortArray[i] === "ä") {
      AusgabeWort = AusgabeWort + "ae";
      Check = "true";
    } else if (WortArray[i] === "ü") {
      AusgabeWort = AusgabeWort + "ue";
      Check = "true";
    } else if (WortArray[i] === "ö") {
      AusgabeWort = AusgabeWort + "oe";
      Check = "true";
    } else if (WortArray[i] === "Ä") {
      AusgabeWort = AusgabeWort + "Ae";
      Check = "true";
    } else if (WortArray[i] === "Ü") {
      AusgabeWort = AusgabeWort + "Ue";
      Check = "true";
    } else if (WortArray[i] === "Ö") {
      AusgabeWort = AusgabeWort + "Oe";
      Check = "true";
    } else if (WortArray[i] === "ß") {
      AusgabeWort = AusgabeWort + "ss";
      Check = "true";
    } else if (WortArray[i] === " ") {
      AusgabeWort = AusgabeWort + "_";
      Check = "true";
    } else {
      for (j = 0; j < ListArray.length; j++) {
        if (WortArray[i] === ListArray[j]) {
          AusgabeWort = AusgabeWort + WortArray[i];
          Check = "true";
          break;
        }
        Check = "false";
      }
    }
    if (Check == "false") {
      AusgabeWort = AusgabeWort + "_";
    }
  }
  return AusgabeWort;
}
function shortenName(Name) {
  var cleanName = CheckChars(Name);
  var nameArr = cleanName.split("");
  var shortName = "";
  if (nameArr.length > 30) {
    for (var i = 0; i < 30; i++) {
      shortName += nameArr[i];
    }
    return shortName + "...";
  } else {
    return Name;
  }
}

//      ----------------------------------------------------------------------
//      Kürzt den übergebenen Namen auf maxLength (1995) Zeichen für die Übergabe zum VPMS

function shortenOutput(Name) {
  var stringName = "" + Name;
  var maxLength = 1995;
  if (stringName.length > maxLength) {
    var shortName = stringName.substring(0, maxLength);
    return shortName + "...";
  } else {
    return Name;
  }
}

//      -----------------------------------------------------------------------

foundVBclips = false; // wird auf TRUE gesetzt, sobald 1 verwendungsbeschränkter Clip gefunden wird
ClipList = {}; // das "VB-Objekt" enthält VPMS ID, Name, TC(s), Rechtekommentar des/der verwendeteten VB Clips -> siehe Funktion 'createVBObject'

CheckVBOfTimelineClips(app.project.activeSequence);

//      ------------------------------------------------------------------------
//      hier beginnt die Hauptfunktion

function CheckVBOfTimelineClips(mysequence) {
  if (mysequence) {
    activeSequence = app.project.activeSequence;
    videoTracks = activeSequence.videoTracks;
    audioTracks = activeSequence.audioTracks;
    nameSeq = activeSequence.name;
    allSeq = app.project.sequences;
    var clipType = videoTracks;
    checkVB(clipType); //checkt alle Clips auf den vorhandenen VIDEOtracks auf Verwendungsbeschränkung

    if (!foundVBclips) {
      return false; //keine VB Clips gefunden
    } else {
      var output =
        "Folgende verwendungsbeschraenkte Clips wurden genutzt: " +
        JSON.stringify(ClipList);
      $.writeln(output);
      return shortenOutput(output); // Ausgabe des Objektes mit allen VB Clips - max 1995 Zeichen
    }
  } else {
    return false; //keine aktive Sequenz gefunden -> Check auf VB Clips wird an dieser Stelle übergangen
  }
}

//      ---------------------------------------------------------------------------------------
//      Funktion überprüft jeden Clip in jeder aktiven Video-Spur auf eine Verwendungsbeschränkung und befüllt entsprechend das VB-Objekt

function checkVB(CLIP) {
  for (var i = 0; i < CLIP.numTracks; i++) {
    var track = CLIP[i];
    var TrackClips = track.clips;
    for (var j = 0; j < TrackClips.numItems; j++) {
      var TrackClip = TrackClips[j];
      if (!TrackClip.disabled) {
        var PrItem = TrackClip.projectItem;
        if (PrItem && PrItem.type == ProjectItemType.CLIP) {
          if (readMetadataFromProjectItem("VERWENDUNGSBE", PrItem) == "Ja") {
            foundVBclips = true;
            var vpmsID = getVPMSid(PrItem);
            var vbClipIn = TrackClip.start; //liefert ein Objekt zurück -> 'vbClipIn.seconds' liefert den in Point in Sekunden
            var vbIN = vbClipIn.seconds;
            var vbClipOut = TrackClip.end; //liefert ein Objekt zurück -> 'vbClipOut.seconds' liefert den out Point in Sekunden
            var vbOUT = vbClipOut.seconds;
            createVBObject(vpmsID, PrItem, vbIN, vbOUT);
          }
        }
      }
    }
  }
}

//      --------------------------------------------------------------------------------------
//      erzeugt das VB-Objekt

function createVBObject(vpmsid, prItem, IN, OUT) {
  if (ClipList[vpmsid]) {
    //wenn die VPMS ID bereits verwendet wurde, wird nur noch der entsprechende TC im VB-Objekt ergänzt
    /*var arrLength=ClipList[vpmsid].TC.length
        ClipList[vpmsid].TC[arrLength]={"In": IN, "Out":OUT }*/
    ClipList[vpmsid].Gesamtlaenge += OUT - IN;
  } else {
    //erstellt einen neuen Eintrag zur entsprechenden VPMS ID im VB-Objekt
    if (readMetadataFromProjectItem("VERWENDUNGSBE2", prItem) == undefined) {
      //hier: ohne originalen Rechtekommentar, da nicht vorhanden
      var laenge = OUT - IN;
      ClipList[vpmsid] = {
        Name: shortenName(prItem.name),
        Gesamtlaenge: laenge /* , "TC": [{"In": IN, "Out":OUT }] */,
      };
    } else {
      //hier: mit originalem Rechtekommentar
      var rechtekommentar = "";
      //neuer Block : Abfrage ob NDR Rechtekommentar enthalten
      var origRechtekommentar =
        "" + readMetadataFromProjectItem("VERWENDUNGSBE2", prItem);
      var ARDVideoplatform = origRechtekommentar.indexOf(
        "MFT Rechtekommentar: KOSTENPFLICHTIG! Rechte für den NDR (FS, Onl und HF) geklärt über Rahmenvertrag mit dem Anbieter. Es gelten die etablierten Abrechnungswege für Kaufmaterial von Rahmenvertragsfirmen des NDR. Für alle anderen LRAs sind die entsprechenden Verträge der einzelnen Häuser mit den jeweiligen Anbietern maßgeblich."
      );
      if (ARDVideoplatform == 0) {
        rechtekommentar = "";
      } else {
        rechtekommentar += readMetadataFromProjectItem(
          "VERWENDUNGSBE2",
          prItem
        );
      }
      var laenge = OUT - IN;
      ClipList[vpmsid] = {
        Name: shortenName(prItem.name),
        Gesamtlaenge: laenge,
        "Orig.Rechtekommentar":
          rechtekommentar /* , "TC": [{"In": IN, "Out":OUT }] */,
      };
    }
  }
}
