app.enableQE(); 
var sqe = qe.project.getActiveSequence();  

var seq = app.project.activeSequence; 
var markers = seq.markers; 

 for (var current_marker = markers.getFirstMarker();    
        current_marker !== undefined; 
        current_marker = markers.getNextMarker(current_marker)) {

        var markerStartTicks = current_marker.start.ticks; //Marker Start Ticks

        seq.setPlayerPosition(markerStartTicks); 

        var playheadPosition = sqe.CTI.timecode; 
        var outputPath = new File("\\\\sb-fbp-ist01\\Transfer\\CNC\\Helmut\\Helmut4\\Admin\\Abnahme\\Thumbnails"); 
        var outputFileName = outputPath.fsName + '\\thumbnail_' + markerStartTicks + '.png'; 

        sqe.exportFramePNG(playheadPosition, outputFileName); 

 }