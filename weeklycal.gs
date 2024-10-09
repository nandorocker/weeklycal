function createWeeklyTemplate() {
  const calendarId = "talk@nan.do"; // Replace with your Calendar ID
  const calendar = CalendarApp.getCalendarById(calendarId);

  const events = [
    // Daily events with an exception for Thursday
    {
      title: "☀️ Morning Routine",
      day: "Weekdays",
      startTime: "09:30",
      duration: 150,
      exceptions: {
        Thursday: { duration: 75 }, // Different duration on Thursday
      },
    },
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

    const handleEventCreation = (dayOffset, customDuration = null) => {
      const eventDate = new Date(startOfWeek);
      eventDate.setDate(startOfWeek.getDate() + dayOffset);

      const startTime = new Date(eventDate);
      startTime.setHours(
        event.startTime.split(":")[0],
        event.startTime.split(":")[1]
      );

      const endTime = new Date(startTime);
      endTime.setMinutes(
        endTime.getMinutes() + (customDuration || event.duration)
      );

      // Check if event already exists
      if (!isEventExists(calendar, event.title, startTime, endTime)) {
        calendar.createEvent(event.title, startTime, endTime);
        // Logger.log('Event Title:' + event.title + " | Start Time: " + startTime + " | End Time: " + endTime);
      }
    };
    if (dayOffset === -2) {
      // Loop through weekdays only (monday through friday)
      for (let i = 1; i <= 5; i++) {
        const currentDayOfWeek = Object.keys(daysOfWeek)[i];
        const customDuration =
          event.exceptions && event.exceptions[currentDayOfWeek]?.duration;

        handleEventCreation(i, customDuration);
      }
    } else if (dayOffset === -1) {
      // Loop through every day
      for (let i = 1; i <= 7; i++) {
        const currentDayOfWeek = Object.keys(daysOfWeek)[i];
        const customDuration =
          event.exceptions && event.exceptions[currentDayOfWeek]?.duration;

        handleEventCreation(i, customDuration);
      }
    } else {
      const customDuration =
        event.exceptions &&
        event.exceptions[Object.keys(daysOfWeek)[dayOffset]]?.duration;
      handleEventCreation(dayOffset, customDuration);
    }
  });
}

function isEventExists(calendar, title, startTime, endTime) {
  const events = calendar.getEvents(startTime, endTime, { search: title });
  return events.length > 0;
}
