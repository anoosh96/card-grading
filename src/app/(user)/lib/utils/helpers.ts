import { Card } from "@/types";

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

export const formatSubmissionStatus = (status: string) => {
  console.log(status)
  switch (status) {
    case 'SUBMISSION_PENDING':
      return 'Submission Pending';
    case 'SUBMISSION_RECEIVED':
      return 'Submission Received';
    case 'GRADING_IN_PROGRESS':
      return 'Grading In Progress';
    case 'GRADING_COMPLETE':
      return 'Grading Complete';
    case 'SUBMISSION_REJECTED':
      return 'Submission Rejected';
    default:
      return 'Unknown Status';
  }
};

export const formatCardStatus = (status: string) => {
  console.log(status)
  switch (status) {
    case 'CARD_PENDING':
      return 'Card Pending';
    case 'CARD_RECEIVED':
      return 'Card Received';
    case 'GRADING_IN_PROGRESS':
      return 'Grading In Progress';
    case 'GRADING_COMPLETE':
      return 'Grading Complete';
    case 'CARD_REJECTED':
      return 'Card Rejected';
    default:
      return 'Unknown Status';
  }
};

export const cardStatusMap: Record<string, string> = {
  CARD_PENDING: "Pending",
  CARD_RECEIVED: "Received",
  GRADING_IN_PROGRESS: "Grading",
  CARD_REJECTED: "Rejected",
  GRADING_COMPLETE: "Complete",
};

export const submissionStatusMap: Record<string, string> = {
  SUBMISSION_PENDING: "Pending",
  SUBMISSION_RECEIVED: "Received",
  GRADING_IN_PROGRESS: "Grading",
  SUBMISSION_REJECTED: "Rejected",
  GRADING_COMPLETE: "Complete",
};

export const getCardsSummary = (cards: Card[], numCards: number): string => {
  const summaryMap: Record<string, number> = {};

  // 1. Count the existing statuses
  cards.forEach((card) => {
    const statusLabel = cardStatusMap[card.status] || "Unknown";
    summaryMap[statusLabel] = (summaryMap[statusLabel] || 0) + 1;
  });

  // 2. Calculate the number of missing cards
  const missingCardsCount = numCards - cards.length;

  // 3. Add "Pending" for missing cards if cards.length is less than numCards
  if (missingCardsCount > 0) {
    summaryMap["Pending"] = (summaryMap["Pending"] || 0) + missingCardsCount;
  }

  // 4. Format the output
  const summaryArray = Object.entries(summaryMap).map(
    ([status, count]) => `${count} ${status}`
  );

  return summaryArray.join(", ");
};

export const getTurnaroundTime = (cards: Card[]): string => {
  if (!cards || cards.length === 0) return '10 Days';

  if (cards.length > 10) {
    return '10 Days';
  }

  const maxDays = Math.max(
    ...cards.map((card) => {
      const turnaroundTime = card.service?.turnAroundTime || "10 Days";
      const match = turnaroundTime?.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    })
  );

  return `${maxDays} Days`;
}



