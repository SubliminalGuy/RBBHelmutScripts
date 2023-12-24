var property = "WorkspaceSwitcher.Data"
var persistent = true
var createIfNotExist = true
var newValue = '{"alwaysConfirmDoubleClickWorkspaceReset":true,"hidden":["Farbe","Bibliotheken","Grafiken","Audio","Effekte"],"overflow":["Alle Fenster","Zusammenstellung","Metaprotokollierung","Bearbeitung","Training","Produktion"],"shown":["01 J-Schnitt","02 J-Import_Export","03 J-Audio","04 C-Schnitt","05 C-Audio","06 C-Farbe"],"switcherwidth":-1,"version":"V5"}'

if (app.properties.doesPropertyExist(property)) {
    var oldValue = app.properties.getProperty(property);
    //app.properties.setProperty(property, newValue, persistent, createIfNotExist)
    alert(oldValue)
    //alert("Changed" + oldValue + "to" + app.properties.getProperty(property));
} else {
    alert('Property "' + property + '" does not exist');
}