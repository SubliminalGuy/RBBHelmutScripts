var omDate = "{project.metadata.OM-Planungsdatum}"

changeDate()

function changeDate()
{
if(omDate!="null" && omDate!="" && omDate!=null)
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