function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th"; // Covers 4th-20th
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}


export const dateFormat = (datetime: string) => {
  const date = new Date(datetime);

  const day = date.getUTCDate();
  const month = date.toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
  const time = date.toLocaleString("en-GB", { hour: "numeric", minute: "numeric", hour12: true, timeZone: "UTC" });

  const formatted = `${day}${getOrdinalSuffix(day)} ${month} ${time}`;

  
  return formatted
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}