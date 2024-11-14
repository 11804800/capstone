export function formatNumber(number) {
  //formatting the numers to k,m and b
  const num = number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    notation: "compact",
    compactDisplay: "short",
  });
  return num;
}

//will give  days ago from current date/day
export function DaysFormat(date) {
  var today = new Date();
  var createdOn = new Date(date);

  var msInDay = 24 * 60 * 60 * 1000;

  createdOn.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  var diff = (+today - +createdOn) / msInDay;
  return diff
}
