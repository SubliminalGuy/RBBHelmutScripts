var aktiveSequenz;
function MuteTrack(TRACK,MUTE)
{
    for(i=0;i<25;i++){
    if(app.project.activeSequence.name==app.project.sequences[i].name)
    {aktiveSequenz=app.project.sequences[i];break}
    }
    aktiveSequenz.audioTracks[TRACK].setMute(MUTE);
}
MuteTrack(AudioTrackNr,MuteTrack);