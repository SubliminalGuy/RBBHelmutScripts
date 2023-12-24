app.enableQE();
//var test1 = qe.project.newSequence("Test", "\\\\ad.rbb-online.de\\Users\\ds031\\Data\\Home\\Documents\\dev\\ExtendScript\\sequenzvorgabe.sqpreset")

// new File(test2).fsName


//var newSequence = app.project.activeSequence
//firstVideoTrack = newSequence.videoTracks[0]
var MasterFolder;

for (var j=0; j < app.project.rootItem.children.length; j++) {
    //$.writeln(app.project.rootItem.children[j].name)
    if (app.project.rootItem.children[j].name == "01_Master") {
        MasterFolder = app.project.rootItem.children[j]
    }
    
}
$.writeln(MasterFolder.children[0].name)
//firstVideoTrack.insertClip(MasterFolder.children[0], newSequence.end)



// loadXMPLibrary

function loadXMPLibrary() {
    try {
        if (ExternalObject.AdobeXMPScript == undefined) {
        ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
        }
    } catch (e) {
        // alert('Unable to load the AdobeXMPScript library!');
        return false;
    }
    return true;
    }

loadXMPLibrary();



//setMetadataOnProjectItem(MasterFolder.children[0],"tapeName", "David", XMPConst.NS_DM)

//setProjectMetadataOnProjectItem(MasterFolder.children[0],"DJname", "rbb")


// setMetadataOnProjectItem - Filebereich

function setMetadataOnProjectItem(projectItem, key, value, ns) {
    var xmpObj = new XMPMeta(projectItem.getXMPMetadata())
    xmpObj.setProperty(ns, key, value);
    projectItem.setXMPMetadata(xmpObj.serialize())
}


// setMetadataOnProjectItem - Clipbereich

function setProjectMetadataOnProjectItem(projectItem, label, value) {
    var ns = "http://ns.adobe.com/premierePrivateProjectMetaData/1.0/";
    var xmpObj = new XMPMeta(projectItem.getXMPMetadata())
    var key = label.replace(/ /g, "")
    var succesfullyAdded = app.project.addPropertyToProjectMetadataSchema(key, label, 2);
    if(succesfullyAdded){
        xmpObj.setProperty(ns, key, value)
        projectItem.setXMPMetadata(xmpObj.serialize(), [key]);
    }
}

