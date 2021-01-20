import { DateTime, DurationObject } from "luxon";
import moment from "moment-timezone";

export type DateObject = {
  day: number;
  month: number;
  year: number;
};

export const getTimestampFromDate = (date?: string): number =>
  date
    ? DateTime.fromFormat(date, "dd-MM-yyyy", { zone: "UTC" }).toMillis()
    : 0;

export const timeDiffTextMillis = (fromDate?: number, toDate?: number) => {
  if (fromDate && toDate) {
    const luxonFrom = DateTime.fromMillis(fromDate, { zone: "UTC" });
    const luxonTo = DateTime.fromMillis(toDate, { zone: "UTC" });
    const diff: DurationObject = luxonTo
      .diff(luxonFrom, ["days", "hours", "minutes", "seconds"])
      .toObject();

    if (diff.days && diff.days > 0) {
      if (diff.days && diff.days < 7) {
        return `${Math.ceil(Number(diff.days))}d`;
      } else {
        return luxonFrom.toFormat("dd.MM.yy");
      }
    } else if (diff.hours && diff.hours > 0) {
      return `${Math.ceil(Number(diff.hours))}h`;
    } else if (diff.minutes && diff.minutes > 0) {
      return `${Math.ceil(Number(diff.minutes))}m`;
    } else {
      return `1m`;
    }
  }
  throw Error("fromDate and toDate must both be defined");
};

export const formatDate = (date?: Date, format = "dd.MM.yyyy") =>
  date ? DateTime.fromJSDate(date).toFormat(format) : "";

export const timeToNow = (fromDate?: number, toDate?: number) => {
  if (fromDate && toDate) {
    const luxonFrom = DateTime.fromMillis(fromDate, { zone: "UTC" });
    const luxonTo = DateTime.fromMillis(toDate, { zone: "UTC" });
    const diff: DurationObject = luxonTo
      .diff(luxonFrom, ["hours", "minutes"])
      .toObject();

    return diff.minutes === 0 ? `${diff.hours}h` : `<${(diff.hours || 0) + 1}h`;
  } else {
    throw Error("fromDate and toDate must both be defined");
  }
};
export const timestampToUtcString = (timestamp?: number) => {
  if (timestamp) {
    const date = DateTime.fromMillis(timestamp, { zone: "UTC" });
    return date.toFormat("dd.MM.yy HH:mm");
  } else {
    throw Error("timestamp must be defined");
  }
};

export const timestampToLocalString = (timestamp?: number) => {
  if (timestamp) {
    const date = DateTime.fromMillis(timestamp, { zone: "UTC" }).toLocal();
    return date.toFormat("dd.MM.yy    HH:mm");
  } else {
    throw Error("timestamp must be defined");
  }
};

export const compareToDateFromDateStartOfDay = (toDate: DateObject) => {
  const { year, month, day } = toDate;
  /**
   * Month starts from 00. so January is 00, February 01, etc.
   */
  if (year && month && day) {
    return (
      new Date().getTime() >=
      new Date(toDate.year, toDate.month - 1, toDate.day).getTime()
    );
  } else {
    throw Error("year, month, and date must all be defined");
  }
};

export const getTimeFromTimezone = (
  dateTime: Date,
  timeZone?: string,
  format = "dd.MM.yyyy HH:mm"
) => {
  if (timeZone) {
    return moment(dateTime, format).tz(timeZone).format(format);
  } else {
    return moment(dateTime, format).format(format);
  }
};
