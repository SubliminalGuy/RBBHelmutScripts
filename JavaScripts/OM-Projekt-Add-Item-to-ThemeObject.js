var themeObject = {stream.last_result}
var projectName = "{project.name}"
var projectId = "{project.id}"
var openMediaId = "{project.metadata.OM-Themen-ID}"

var freshDate = "{project.metadata.OM-Planungsdatum}"


if (themeObject[freshDate]) {

themeObject[freshDate].push([projectName,projectId])
}

else {
themeObject[freshDate] = [[projectName,projectId]]
}

JSON.stringify(themeObject)