function createWeeklyTemplate() {
  const calendarId = "talk@nan.do"; // Replace with your Calendar ID
  const calendar = CalendarApp.getCalendarById(calendarId);

  const events = [
    // Daily events
    {
      title: "☀️ Morning Routine",
      day: "Weekdays",
      startTime: "09:30",
      duration: 150,
    }, // 2.5 hours
    { title: "🍽️ Lunch", day: "Weekdays", startTime: "12:00", duration: 45 },
    { title: "🍽️ Dinner", day: "Weekdays", startTime: "19:30", duration: 60 },
    {
      title: "🎉 Free time",
      day: "Weekdays",
      startTime: "20:30",
      duration: 195,
    },
    {
      title: "🌙 Wind down",
      day: "Weekdays",
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
    Weekdays: -2,
  };

  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay);

  events.forEach((event) => {
    const dayOffset = daysOfWeek[event.day];

    if (dayOffset === -2) {
      // Loop through weekdays only (Monday to Friday)
      for (let i = 1; i <= 5; i++) {
        const eventDate = new Date(startOfWeek);
        eventDate.setDate(startOfWeek.getDate() + i);

        const startTime = new Date(eventDate);
        startTime.setHours(
          event.startTime.split(":")[0],
          event.startTime.split(":")[1]
        );

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + event.duration);

        // Check if event already exists
        if (!isEventExists(calendar, event.title, startTime, endTime)) {
          calendar.createEvent(event.title, startTime, endTime);
          // Logger.log('Event Title:' + event.title + " | Start Time: " + startTime + " | End Time: " + endTime);
        }
      }
    } else if (dayOffset === -1) {
      // Loop through weekdays only (Monday to Friday)
      for (let i = 1; i <= 5; i++) {
        const eventDate = new Date(startOfWeek);
        eventDate.setDate(startOfWeek.getDate() + i);

        const startTime = new Date(eventDate);
        startTime.setHours(
          event.startTime.split(":")[0],
          event.startTime.split(":")[1]
        );

        const endTime = new Date(startTime);
        endTime.setMinutes(endTime.getMinutes() + event.duration);

        // Check if event already exists
        if (!isEventExists(calendar, event.title, startTime, endTime)) {
          calendar.createEvent(event.title, startTime, endTime);
          // Logger.log('Event Title:' + event.title + " | Start Time: " + startTime + " | End Time: " + endTime);
        }
      }
    } else {
      const eventDate = new Date(startOfWeek);
      eventDate.setDate(startOfWeek.getDate() + dayOffset);

      const startTime = new Date(eventDate);
      startTime.setHours(
        event.startTime.split(":")[0],
        event.startTime.split(":")[1]
      );

      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + event.duration);

      // Check if event already exists
      if (!isEventExists(calendar, event.title, startTime, endTime)) {
        calendar.createEvent(event.title, startTime, endTime);
        // Logger.log('Event Title:' + event.title + " | Start Time: " + startTime + " | End Time: " + endTime);
      }
    }
  });
}

function isEventExists(calendar, title, startTime, endTime) {
  const events = calendar.getEvents(startTime, endTime, { search: title });
  return events.length > 0;
}
