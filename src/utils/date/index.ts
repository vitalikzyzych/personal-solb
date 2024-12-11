import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Load the plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(relativeTime);

// Function to convert string date to relative time
export function formatRelativeTime(dateString: string): string {
  return dayjs(dateString).fromNow();
}

// Function to format date based on conditions
export function formatDateTime(dateString: string): string {
  const inputDate = dayjs(dateString);
  const startOfWeek = dayjs().startOf("week");
  const endOfWeek = dayjs().endOf("week");

  // If the date is in the current week, show the day name and time
  if (
    inputDate.isSameOrAfter(startOfWeek) &&
    inputDate.isSameOrBefore(endOfWeek)
  ) {
    return inputDate.format("dddd h:mm A"); // Example: "Monday 2:30 PM"
  }

  // Otherwise, show date in DD MMM YYYY h:mm A format
  return inputDate.format("DD MMM YYYY h:mm A"); // Example: "09 Dec 2024 12:05 PM"
}
