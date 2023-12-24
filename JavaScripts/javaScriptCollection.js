// ACHTUNG! 
// DER CODE HIER WIRD PRODUKTIV GENUTZT. BITTE VOR AENDERUNG mit david.schwertgen@rbb-online.de oder tobias.pietschmann@rbb-online.de SPRECHEN !!!!
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// https://github.com/SubliminalGuy/RBB-Helmut-MiniJobs/blob/master/JavaScripts/javaScriptCollection.js
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



// nimmt das Projektmetadatum PLANUNGSDATUM aus OpenMedia, wandelt es aus dem Format DD.MM.YYYY in das Format YYYY-MM-DD plus 7 Tage 
// und gibt das Ergebnis aus. Im nächsten Schritt wird das Datum genutzt um das Löschdatum zu setzen.

function changeDate(omDate)
{
if(omDate!=null && omDate!="null" && omDate!="")
{
var oldDateArr = omDate.split(".")
var newDate = oldDateArr[2]+"-"+oldDateArr[1]+"-"+oldDateArr[0]

var date = new Date(newDate);
date.setDate(date.getDate(newDate)+7);

var finaldate = date.getFullYear(newDate)+"-"+(date.getMonth(newDate)+1)+"-"+(date.getDate(newDate));

return finaldate
}
else
{
var date = new Date();
date.setDate(date.getDate()+7);
var finaldate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
return finaldate;
}
}

// Aendert das OM Planungsdatum in die folgende Schreibweise fuer die Projektordner Erstellung auf Fileebene: 202203\23Mar.
/*
function changeDate(omDate) {
    if (omDate != null && omDate != "null" && omDate != "") {
        var oldDateArr = omDate.split(".")

        var newDate = oldDateArr[2] + oldDateArr[1]

        var monthNum = oldDateArr[1]

        switch (monthNum) {

            case "01":
                var monthTextshort = "Jan"
                break;
            case "02":
                var monthTextshort = "Feb"
                break;
            case "03":
                var monthTextshort = "Mar"
                break;
            case "04":
                var monthTextshort = "Apr"
                break;
            case "05":
                var monthTextshort = "May"
                break;
            case "06":
                var monthTextshort = "Jun"
                break;
            case "07":
                var monthTextshort = "Jul"
                break;
            case "08":
                var monthTextshort = "Aug"
                break;
            case "09":
                var monthTextshort = "Sep"
                break;
            case "10":
                var monthTextshort = "Oct"
                break;
            case "11":
                var monthTextshort = "Nov"
                break;
            case "12":
                var monthTextshort = "Dec"
                break;
        }

        var newDate2 = oldDateArr[0] + monthTextshort

        var projectPfad = newDate + "/" + newDate2

        return projectPfad;

    }
}
*/

// GET SwatIO JSON

var plattform = []

function readChannels(swatChannels) {

 for (var i=0; i <swatChannels.length;i++) {
plattform.push({"Name": mapNames(swatChannels[i].attributes.category), 
"Kanal": {
"Name": swatChannels[i].attributes.name,
"ID": swatChannels[i].id
}})
}

plattform.sort(function (a, b) {
  if (a.Name < b.Name) {
    return -1;
  }

  return 0;
});



}

function mapNames(name) {
  if (name === "tw") {
    return "twitter";
  } else if (name === "yt") {
    return "youTube";
  } else if (name === "fb") {
    return "facebook";
  } else if (name === "in") {
    return "instagram";
  } else {
    return name;
  }
}



// Return SwatIO Channel List


var ChannelNames=""

function createChannelList(Channels) {
for (var i = 0; i < Channels.Plattform.length; i++) {
ChannelNames += Channels.Plattform[i].Name + "_" + Channels.Plattform[i].Kanal.Name + ","
}

return ChannelNames
}

// Findet die Channel-ID des Ausspielkanals heraus

var channelId = ""


function createChannelId(kanal) {

for (var i=0; i < Channels.Plattform.length; i++) {

  if (Channels.Plattform[i].Name === kanal) {
    channelId = Channels.Plattform[i].Kanal.ID
  }

}

return channelId
}