import React from "react";

const Currentdate = () => {
  let currentDate = new Date().toLocaleDateString();
  const currentDay = new Date();
  const dayOfWeek = currentDay.getDay();
  let dayName = null;
  switch (dayOfWeek) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
    default:
      dayName = null;
  }

  return (
    <div className="p-2 m-2">
      <p className="text-2xl">{currentDate}</p>
      <p className="text-1xl">{dayName}</p>
    </div>
  );
};

export default Currentdate;
