var datum = "{project.metadata.OM-Planungsdatum}"

var monthNames = ["Jan", "Feb", "Mar", "Apr", "Mai", "Juni",
  "Juli", "Aug", "Sep", "Okt", "Nov", "Dez"
];

function getDateSuffix() {

    var dateArray = datum.split(".")
    var neuesDatum = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0]
    var d = new Date(neuesDatum)
    
    var test = d.getDate() + "_" + monthNames[d.getMonth()]
    return test
}

getDateSuffix()