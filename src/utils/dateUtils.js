function generateDateRange(daysToAdd = 5) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);
  const maxDateString = maxDate.toISOString().split("T")[0];
  const minDateString = today.toISOString().split("T")[0];

  const startDay = today.getDate().toString().padStart(2, "0");

  const endDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysToAdd
  );
  const endDay = endDate.getDate().toString().padStart(2, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const endMonth = (endDate.getMonth() + 1).toString().padStart(2, "0");
  const year = today.getFullYear();
  const endYear = endDate.getFullYear();

  const startDate = `${year}-${month}-${startDay}`;
  const endDateStr = `${endYear}-${endMonth}-${endDay}`;

  return {
    startDate,
    endDate: endDateStr,
    maxDate: maxDateString,
    minDate: minDateString,
  };
}

function getDayOfWeek(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
}

const isValidDate = (dateString) => {
  const regex = /^(20\d\d)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(dateString);
};

function convertDateToISO(dateStr) {
  if (!dateStr || dateStr.split(".").length !== 3) {
    console.error("Invalid date format:", dateStr);
    return "";
  }

  const [day, month, year] = dateStr.split(".");
  if (!day || !month || !year) {
    console.error("Invalid date components:", dateStr);
    return "";
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function convertDateToEuropean(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
}

function calculateCountdown(endDate) {
  const end = new Date(endDate);
  const now = new Date();
  const difference = end - now;

  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export {
  generateDateRange,
  getDayOfWeek,
  isValidDate,
  convertDateToISO,
  convertDateToEuropean,
  calculateCountdown
};
