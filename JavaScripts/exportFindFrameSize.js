var nodeId = "{node.result.c3bd02e7-206f-4104-b109-a3b9f1e1c1c1}"
var alleNamen = nodeId
var gefundenenSequenz = ""
var projektSequenzen = app.project.sequences
var eachID
var anzahlSequenzen = app.project.sequences.numSequences

function FrameSize(){
for (i=0; i < anzahlSequenzen; i++){
eachID = projektSequenzen[i].sequenceID
eachID = eachID.toString()
if (eachID === nodeId) {
var verticalSize = app.project.sequences[i].frameSizeVertical
verticalSize = verticalSize.toString()
var horizontalSize = app.project.sequences[i].frameSizeHorizontal
horizontalSize = horizontalSize.toString()
 return horizontalSize + "x" + verticalSize
}
}

}
  
FrameSize();