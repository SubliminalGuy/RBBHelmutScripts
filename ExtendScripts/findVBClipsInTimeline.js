//      ---------------------------------------------------------------------
//      Liefert Metadatenwert anhand eines Key und eines Projekt Objekts zurück

function readMetadataFromProjectItem(key, projectItem) {
    if (ExternalObject.AdobeXMPScript === undefined) {
        ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
    }
    var ns = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
    var xmpObj = new XMPMeta(projectItem.getProjectMetadata());
    return xmpObj.getProperty(ns, key);
}

//      ----------------------------------------------------------------------
//      liefert die VPMS ID eines Projekt Objektes zurück

function getVPMSid(item){
    var vpmsIDmeta = ""
    vpmsIDmeta += readMetadataFromProjectItem("vpmsObjectId", item)
    var vpmsIDarr = vpmsIDmeta.split("/")
    return vpmsIDarr[4]
}

//      -----------------------------------------------------------------------
//      Kürzt den übergebenen Namen auf maximal 30 Zeichen ein und ergänzt "..."

function shortenName(Name) {
    var nameArr = Name.split("")
    var shortName = ""
    if (nameArr.length > 30) {
        for (var i = 0; i < 30; i++) {
            shortName += nameArr[i]
        }
        return shortName + "..."
    }
    else { return Name }
}
//      -----------------------------------------------------------------------





foundVBclips = false        // wird auf TRUE gesetzt, sobald 1 verwendungsbeschränkter Clip gefunden wird
ClipList = {}               // das "VB-Objekt" enthält VPMS ID, Name, TC(s), Rechtekommentar des/der verwendeteten VB Clips -> siehe Funktion 'createVBObject'



CheckVBOfTimelineClips(app.project.activeSequence)


//      ------------------------------------------------------------------------
//      hier beginnt die Hauptfunktion

function CheckVBOfTimelineClips(mysequence) {
    if (mysequence) {
        activeSequence = app.project.activeSequence
        videoTracks = activeSequence.videoTracks
        audioTracks = activeSequence.audioTracks
        nameSeq = activeSequence.name
        allSeq = app.project.sequences
        var clipType = videoTracks
        checkVB(clipType);            //checkt alle Clips auf den vorhandenen VIDEOtracks auf Verwendungsbeschränkung

        if (!foundVBclips) {
            return false        //keine VB Clips gefunden
        }
        else {
            var output = "Folgende verwendungsbeschraenkte Clips wurden genutzt: "+JSON.stringify(ClipList)
            $.writeln(output)
            return output       // Ausgabe des Objektes mit allen VB Clips

        }
    }


    else {
        return false        //keine aktive Sequenz gefunden -> Check auf VB Clips wird an dieser Stelle übergangen
    }
}

//      ---------------------------------------------------------------------------------------
//      Funktion überprüft jeden Clip in jeder aktiven Video-Spur auf eine Verwendungsbeschränkung und befüllt entsprechend das VB-Objekt

function checkVB(CLIP) {
    for (var i = 0; i < CLIP.numTracks; i++) {
        var track = CLIP[i]
        var TrackClips = track.clips
        for (var j = 0; j < TrackClips.numItems; j++) {
            var TrackClip = TrackClips[j]
            if (!TrackClip.disabled) {
                var PrItem = TrackClip.projectItem
                if (PrItem && PrItem.type == ProjectItemType.CLIP) {
                    if (readMetadataFromProjectItem("VERWENDUNGSBE", PrItem) == "Ja") {
                        foundVBclips = true
                        var vpmsID = getVPMSid(PrItem)
                        var vbClipIn = TrackClip.start  //liefert ein Objekt zurück -> 'vbClipIn.seconds' liefert den in Point in Sekunden
                        var vbIN = vbClipIn.seconds
                        var vbClipOut = TrackClip.end  //liefert ein Objekt zurück -> 'vbClipOut.seconds' liefert den out Point in Sekunden
                        var vbOUT = vbClipOut.seconds
                        createVBObject(vpmsID, PrItem, vbIN, vbOUT)
                    }


                }
            }
        }
    }
}



//      --------------------------------------------------------------------------------------
//      erzeugt das VB-Objekt

function createVBObject(vpmsid, prItem, IN, OUT) {
    if (ClipList[vpmsid]) {                                     //wenn die VPMS ID bereits verwendet wurde, wird nur noch der entsprechende TC im VB-Objekt ergänzt
        var arrLength=ClipList[vpmsid].TC.length
        ClipList[vpmsid].TC[arrLength]={"In": IN, "Out":OUT }
    }
    else {                                                      //erstellt einen neuen Eintrag zur entsprechenden VPMS ID im VB-Objekt
        if(readMetadataFromProjectItem("VERWENDUNGSBE2", prItem)==undefined){           //hier: ohne originalen Rechtekommentar, da nicht vorhanden
            ClipList[vpmsid] = { "Name": shortenName(prItem.name), "TC": [{"In": IN, "Out":OUT }]  }
        }else{                                                                          //hier: mit originalem Rechtekommentar
            var rechtekommentar = ""
            rechtekommentar+=readMetadataFromProjectItem("VERWENDUNGSBE2", prItem)
            ClipList[vpmsid] = { "Name": shortenName(prItem.name), "TC": [{"In": IN, "Out":OUT }], "Orig.Rechtekommentar": rechtekommentar }
        }
    }
}
