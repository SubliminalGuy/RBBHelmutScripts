//Cheat Sheet RBB


//Beispiel: Schleife nutzen um über alle VideoTracks einer Sequenz durchzugehen

var meinProjekt = app.project;
var meineAktiveSequenz = meinProjekt.activeSequence;
var videoTracksMeinerAktivenSequenz = meineAktiveSequenz.videoTracks;

for (var i = 0; i < videoTracksMeinerAktivenSequenz.length; i++) {
    var aktuellerVideoTrack = videoTracksMeinerAktivenSequenz[i];
}



//Metadaten im Projekt Ändern:

function loadXMPLibrary() {
    try {
        if (ExternalObject.AdobeXMPScript == undefined) {
            ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
        }
    } catch (e) {
        return false;
    }
    return true;
}
loadXMPLibrary();


setMetadataOnFile(app.project.rootItem.children[2], "tapeName", "rbb", XMPConst.NS_DM)

function setMetadataOnFile(projectItem, key, value, ns) {
    var xmpObj = new XMPMeta(projectItem.getXMPMetadata());
    xmpObj.setProperty(ns, key, value);
    projectItem.setXMPMetadata(xmpObj.serialize());
}

setMetadataOnClip(app.project.rootItem.children[2], "rbb test", "rbb")

function setMetadataOnClip(projectItem, label, value) {
    var ns = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
    var xmpObj = new XMPMeta(projectItem.getProjectMetadata());
    var key = label.replace(/ /g, "");
    app.project.addPropertyToProjectMetadataSchema(key, label, 2);
    xmpObj.setProperty(ns, key, value);
    projectItem.setProjectMetadata(xmpObj.serialize(), [key]);
}

//Events

app.onItemAddedToProjectSuccess = functionDieAufgerufenWirdWennEinNeuesElementDemProjectHinzugefuegtWird;

function functionDieAufgerufenWirdWennEinNeuesElementDemProjectHinzugefuegtWird(whichProject, addedProjectItem) {
    app.setSDKEventMessage(addedProjectItem.getMediaPath(), 'info');

}

app.bind('onProjectChanged', functionDieAufgerufenWirdWennDasProjectSichAendert);

function functionDieAufgerufenWirdWennDasProjectSichAendert(documentID) {

    app.setSDKEventMessage(documentID, 'info');

}

//Premiere Pro Scripting Dokumentation:
//https://ppro-scripting.docsforadobe.dev/
// 
