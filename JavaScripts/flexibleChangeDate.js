function changeDate(newDate, datOffset) {
  if (newDate != null && newDate != "null" && newDate != "") {
    var date = new Date(newDate);
    date.setDate(date.getDate(newDate) + Number(dateOffset));

    var finaldate =
      date.getFullYear(newDate) +
      "-" +
      (date.getMonth(newDate) + 1) +
      "-" +
      date.getDate(newDate);

    return finaldate;
  } else {
    var date = new Date();
    date.setDate(date.getDate() + 7);
    var finaldate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return finaldate;
  }
}
