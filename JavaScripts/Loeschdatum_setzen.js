// var group = "Information" //"{project.group}"
// var category = "CNC" //"{project.category}"
// var template = "CNC allgemein" //"{project.template}"
// var defaultDate = "" //"{project.metadata.Löschdatum}"
var group = "{project.group}"
var category = "{project.category}"
var template = "{project.template}"
var defaultDate = "{project.metadata.Löschdatum}"
var offset
var s = 7       // 1 Woche
var m = 48      // 7 Wochen
var l = 168     // 6 Monate
var xl = 370    // 1 Jahr
var dateOffset = s

var allTemplates = {
            "Gesellschaft": {
                    "Fritz": {
                        "Falsch aber Lustig": m,
                        "Fritz allgemein": m
                    },
                    "Studio 3": {
                        "Studio 3": s
                    }
            },
            "Information": {
                    "CNC": {
                            "CNC allgemein": s,
                            "Online rbb24": s,
                            "YouTube Explainer": m,
                            "Z_Projektvorlage OM": s

                    },
                    "UHD": {
                            "UHD": m 
                    }
            },
            "Kultur": {
                    "PLATZHALTER KATEGORIE" : {
                            "PLATZHALTER TEMPLATE1": s,
                            "PLATZHALTER TEMPLATE2": m
                    }
            },
            "Sport": {
                    "Sport": {
                            "Kurze Clips": m
                            ,
                            "Berliner Schnauze": xl
                    },
                    "Social Media": {
                            "Sport_Social Media": xl
                    }
            }
}

function getOffset(group,category,template,allTemplates,s){

   if (offset=allTemplates[group][category][template] != null)  {
       offset=allTemplates[group][category][template]
    }
  else{

      offset = s

    }
    return offset
}


function changeDate(newDate, dateOffset) {
    if (newDate != null && newDate != "null" && newDate != "") {
        var date = new Date(newDate);
        date.setDate(date.getDate(newDate) + dateOffset);

        var finaldate =
        date.getFullYear(newDate) +
            "-" +
            (date.getMonth(newDate) + 1) +
            "-" +
            date.getDate(newDate);

            return finaldate;
        } else {
            var date = new Date();
            date.setDate(date.getDate() + dateOffset);
            var finaldate =
            date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            return finaldate;
        }
    }

getOffset(group,category,template,allTemplates,s)
offset

changeDate(defaultDate,offset)

