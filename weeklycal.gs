function createWeeklyTemplate() {
  const calendarId = "talk@nan.do"; // Replace with your Calendar ID
  const calendar = CalendarApp.getCalendarById(calendarId);

  const events = [
    // Daily events
    {
      title: "☀️ Morning Routine",
      day: "Everyday",
      startTime: "09:30",
      duration: 150,
    }, // 2.5 hours
    { title: "🍽️ Lunch", day: "Everyday", startTime: "12:00", duration: 45 },
    { title: "🍽️ Dinner", day: "Everyday", startTime: "19:30", duration: 60 },
    {
      title: "🎉 Free time",
      day: "Everyday",
      startTime: "20:30",
      duration: 195,
    },
    {
      title: "🌙 Wind down",
      day: "Everyday",
      startTime: "23:30",
      duration: 60,
    },

    // Work events
    { title: "💼 Work", day: "Monday", startTime: "13:00", duration: 270 },
    { title: "💼 Work", day: "Wednesday", startTime: "13:15", duration: 315 },
    { title: "💼 Work", day: "Friday", startTime: "13:15", duration: 315 },
    { title: "💼 Work", day: "Thursday", startTime: "13:15", duration: 315 },
    { title: "💼 Work", day: "Tuesday", startTime: "13:15", duration: 315 },
  ];

  const daysOfWeek = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Everyday: -1,
  };

  const today = new Date();
  const startOfWeek = getStartOfWeek(today);

  events.forEach((event) => {
    if (event.day === "Everyday") {
      createDailyEvents(event, startOfWeek, calendar);
    } else {
      createEvent(event, startOfWeek, calendar);
    }
  });
}

function getStartOfWeek(date) {
  const day = date.getDay();
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - day + (day === 0 ? -6 : 1)); // Adjusts for Monday start
  return startOfWeek;
}

function createDailyEvents(event, startOfWeek, calendar) {
  for (let i = 1; i <= 5; i++) {
    // Monday to Friday
    const eventDate = new Date(startOfWeek);
    eventDate.setDate(startOfWeek.getDate() + i);
    createSingleEvent(event, eventDate, calendar);
  }
}

function createEvent(event, startOfWeek, calendar) {
  const dayOffset = daysOfWeek[event.day];
  const eventDate = new Date(startOfWeek);
  eventDate.setDate(startOfWeek.getDate() + dayOffset);
  createSingleEvent(event, eventDate, calendar);
}

function createSingleEvent(event, eventDate, calendar) {
  const startTime = parseTime(event.startTime, eventDate);
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + event.duration);

  // Check if event already exists
  if (!isEventExists(calendar, event.title, startTime, endTime)) {
    calendar.createEvent(event.title, startTime, endTime);
  }
}

function parseTime(timeString, date) {
  const timeParts = timeString.split(":");
  const parsedDate = new Date(date);
  parsedDate.setHours(timeParts[0], timeParts[1]);
  return parsedDate;
}

function isEventExists(calendar, title, startTime, endTime) {
  const events = calendar.getEvents(startTime, endTime, { search: title });
  return events.length > 0;
}
