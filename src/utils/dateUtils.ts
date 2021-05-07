import { DateTime } from "luxon";

function formatLastCommunicated(value: string): string {
  const date = new Date(value);
  const luxonDate = DateTime.fromJSDate(date);

  if (!luxonDate.isValid) {
    return "Could not parse date"; // There is a malformed date with Lara's interview request in the provided JSON
    // Ideally we'd want to throw an error here, but for the sake of having the app run without changing the provided interview demo data, we just return a string instead
  }
  const dateDiff = luxonDate.diffNow("days").days;

  // date differences in luxon is negative in the past and positive in the future, so there should never be a date diff bigger than 0
  if (dateDiff > 0) {
    throw new Error("Someone is talking to you from the future"); //This should not be possible, throw error
  }

  if (dateDiff > -2 && dateDiff < -1) {
    const formattedDate = luxonDate.toRelativeCalendar();
    // Could have just returned "Yesterday", but this is more flexible for future expansion to do things like "3 days ago" if ever needed
    return formattedDate!.charAt(0).toUpperCase() + formattedDate!.slice(1);
  } else if (dateDiff > -1) {
    // This formats the date correctly, but because default ZA  is 24-hour based, it cannot determine AM or PM, so we force to a locale that uses 12 hour displays
    return luxonDate.setLocale("en-us").toLocaleString(DateTime.TIME_SIMPLE);
  }

  return luxonDate.toLocaleString();
}

export { formatLastCommunicated };
