class Employee {
  constructor(name) {
    this.name = name;
    this.shifts = [];
  }

  addShift(shift) {
    this.shifts.push(shift);
  }

  getShifts() {
    return this.shifts;
  }
}

class Shift {
  constructor(dayOfWeek, startTime, endTime) {
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function getRandomWorkdays(workdaysNeeded) {
  const shuffledDays = daysOfWeek.slice().sort(() => 0.5 - Math.random());
  return shuffledDays.slice(0, workdaysNeeded);
}

const generateBtn = document.getElementById("generateBtn");
const scheduleDiv = document.getElementById("schedule");
const clockInBtn = document.getElementById("clockInBtn");
const clockOutBtn = document.getElementById("clockOutBtn");
const clockInTimeSpan = document.getElementById("clockInTime");
const clockOutTimeSpan = document.getElementById("clockOutTime");

let clockedIn = false;
let clockInTime = null;

generateBtn.addEventListener("click", () => {
  const workdays = getRandomWorkdays(5);

  const shifts = [
    new Shift(workdays[0], "12:00 PM", "06:00 PM"),
    new Shift(workdays[1], "01:00 PM", "07:00 PM"),
    new Shift(workdays[2], "02:00 PM", "08:00 PM"),
    new Shift(workdays[3], "12:00 PM", "06:00 PM"),
    new Shift(workdays[4], "01:00 PM", "07:00 PM"),
  ];

  let scheduleHtml = "<h2>Schedule</h2>";

  daysOfWeek.forEach((day) => {
    const dayShifts = shifts.filter((shift) => shift.dayOfWeek === day);
    if (dayShifts.length > 0) {
      scheduleHtml += `<h3>${day}</h3>`;
      scheduleHtml += "<ul>";
      dayShifts.forEach((shift) => {
        scheduleHtml += `<li>${shift.startTime} - ${shift.endTime}</li>`;
      });
      scheduleHtml += "</ul>";
    }
  });

  scheduleDiv.innerHTML = scheduleHtml;
});

clockInBtn.addEventListener("click", () => {
  if (!clockedIn) {
    clockInTime = new Date();
    clockInTimeSpan.textContent = clockInTime.toLocaleTimeString();
    clockedIn = true;
  }
});

clockOutBtn.addEventListener("click", () => {
  if (clockedIn) {
    const clockOutTime = new Date();
    clockOutTimeSpan.textContent = clockOutTime.toLocaleTimeString();
    clockedIn = false;
  }
});
