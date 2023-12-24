app.enableQE(); 
var sqe = qe.project.getActiveSequence();

var playheadPosition = sqe.CTI.timecode; 

//alert(playheadTime.toString())


var outputPath = new File("\\\\sb-fbp-ist01\\Transfer\\CNC\\Helmut\\Helmut4\\Admin\\Abnahme\\Thumbnails");


var outputFileName = outputPath.fsName + '\\thumbnail1.png';
//alert(outputFileName)
sqe.exportFramePNG(playheadPosition, outputFileName);