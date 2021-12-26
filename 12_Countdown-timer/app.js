const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveawy = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

// months are ZERO index based;
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2022, 3, 24, 11, 30, 0);
// מוסיף עוד 10 ימים
const futureDate = new Date(tempYear, tempMonth, tempDay + 11, 11, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month]; // ניגש למערך של החודשים ומוציא שם של חודש

const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()]; // ניגש למערך של הימים ומוציא שם של יום

giveawy.textContent = `Giveaway Ends On ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today; // This time is in ms
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr
  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array

  const values = [days, hours, minutes, seconds];
  // מכניס את הספירה לאחור לתצוגה באתר
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });

  //  Add 0 to number
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  // אם הזמן נגמר
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}
// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();
