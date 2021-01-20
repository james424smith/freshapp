import * as dateFunctions from "./dateUtils";

describe("Test getTimestampFromDate Function", () => {
  it("millis result as string", () => {
    const dateTime = dateFunctions.getTimestampFromDate("06-12-2019");
    expect(dateTime).not.toBe(1575504000000);
  });

  it("millis result as number", () => {
    const dateTime = dateFunctions.getTimestampFromDate("06-12-2019");
    expect(dateTime).toBe(1575590400000);
  });

  it("compareToDateFromDateStartOfDay should return true when all values to DateObject are defined and day is before today", () => {
    const toDate = { year: 2020, month: 1, day: 1 };
    const result = dateFunctions.compareToDateFromDateStartOfDay(toDate);

    expect(result).toBe(true);
  });

  it("compareToDateFromDateStartOfDay should expect an error if any of the values of DateObject is undefined ", () => {
    const toDate = {
      year: 2020,
      month: 1,
      day: (undefined as unknown) as number,
    };

    expect(() =>
      dateFunctions.compareToDateFromDateStartOfDay(toDate)
    ).toThrowError("year, month, and date must all be defined");
  });

  it("should return a correct value when the timestamp is define when calling timestampToLocalString", () => {
    const date = dateFunctions.timestampToLocalString(1604404707000);

    expect(date).toBe("03.11.20    11:58");
  });

  it("should expect an error when timestap is undefined when calling timestampToLocalString", () => {
    expect(() => dateFunctions.timestampToLocalString()).toThrowError(
      "timestamp must be defined"
    );
  });

  it("return 0 if date is not defined", () => {
    const dateTime = dateFunctions.getTimestampFromDate();
    expect(dateTime).toBe(0);
  });
});

describe("Test timeDiffTextMillis Function", () => {
  it("expect error when params fromDate is not in place", () => {
    expect(() => dateFunctions.timeDiffTextMillis(1234)).toThrow(
      "fromDate and toDate must both be defined"
    );
  });

  it("expect error when params toDate is not in place", () => {
    expect(() =>
      dateFunctions.timeDiffTextMillis(undefined, 1234)
    ).toThrowError("fromDate and toDate must both be defined");
  });

  it("expect error when params are not in place", () => {
    expect(() => dateFunctions.timeDiffTextMillis()).toThrowError(
      "fromDate and toDate must both be defined"
    );
  });

  it("validate wrong timeDiffTextMillis output string for other", () => {
    const diff = dateFunctions.timeDiffTextMillis(20191010, 20191011);
    expect(diff).not.toBe("hello my friend");
  });

  it("validate wrong timeDiffTextMillis output string for minutes", () => {
    const diff = dateFunctions.timeDiffTextMillis(20191010000, 20191011000);
    expect(diff).not.toBe("hello my friend");
  });

  it("validate correct timeDiffTextMillis output string to minutes", () => {
    const diff = dateFunctions.timeDiffTextMillis(1573138431000, 1573138919000);
    expect(diff).toBe("8m");
  });

  it("validate correct timeDiffTextMillis output string to hours", () => {
    const diff = dateFunctions.timeDiffTextMillis(1573128119000, 1573138919000);
    expect(diff).toBe("3h");
  });

  it("validate correct timeDiffTextMillis output string for days", () => {
    const diff = dateFunctions.timeDiffTextMillis(1572782519000, 1573128119000);
    expect(diff).toBe("4d");
  });

  it("validate correct timeDiffTextMillis output string for more than 6 days", () => {
    const diff = dateFunctions.timeDiffTextMillis(1572523319000, 1573128119000);
    expect(diff).toBe("31.10.19");
  });
});

describe("Test timeToNow Function", () => {
  it("expect error when params fromDate is not in place", () => {
    expect(() =>
      dateFunctions.timeToNow(1573124519000, undefined)
    ).toThrowError("fromDate and toDate must both be defined");
  });

  it("expect error when params toDate is not in place", () => {
    expect(() => dateFunctions.timeToNow(undefined, 1234)).toThrowError(
      "fromDate and toDate must both be defined"
    );
  });

  it("expect error when params are not in place", () => {
    expect(() => dateFunctions.timeToNow()).toThrowError(
      "fromDate and toDate must both be defined"
    );
  });
  it("validate timeToNow output string for exact remaining", () => {
    const diff = dateFunctions.timeToNow(1573124519000, 1573128119000);
    expect(diff).toBe("1h");
  });
  it("validate timeToNow output string", () => {
    const diff = dateFunctions.timeToNow(1573124519000, 1573128118000);
    expect(diff).toBe("<1h");
  });

  it("validate timeToNow result when same date", () => {
    const diff = dateFunctions.timeToNow(1573124519000, 1573124519000);
    expect(diff).toBe("0h");
  });
});

describe("Test timestampToUtcString Function", () => {
  it("wrong timestampToUtcString output string", () => {
    const date = dateFunctions.timestampToUtcString(1571128476);
    expect(date).toBe("19.01.70 04:25");
  });

  it("correct timestampToUtcString output string", () => {
    const date = dateFunctions.timestampToUtcString(1571128476);
    expect(date).toBe("19.01.70 04:25");
  });
  it("expect error when no timestamp is", () => {
    expect(() => dateFunctions.timestampToUtcString()).toThrowError(
      "timestamp must be defined"
    );
  });
});

describe("Test getTimeFromTimezone Function", () => {
  it("wrong getTimeFromTimezone output string", () => {
    const time = dateFunctions.getTimeFromTimezone(
      new Date(1574237559000),
      "Asia/Nicosia"
    );
    expect(time).not.toBe("2:54");
  });
  it("correctly getTimeFromTimezone output string", () => {
    const time = dateFunctions.getTimeFromTimezone(
      new Date(1574237559000),
      "Atlantic/Reykjavik",
      "HH:mm"
    );
    expect(time).toBe("08:12");
  });

  it("correctly getTimeFromTimezone output string for Cyprus", () => {
    const time = dateFunctions.getTimeFromTimezone(
      new Date(1574237559000),
      "Asia/Nicosia",
      "HH:mm"
    );
    expect(time).toBe("10:12");
  });
  it("correctly getTimeFromTimezone output string UTC time", () => {
    const time = dateFunctions.getTimeFromTimezone(
      new Date(1574237559000),
      undefined,
      "HH:mm"
    );
    expect(time).toBe("08:12");
  });
});

describe("Test formatDate", () => {
  it("should return empty string when date is undefined", () => {
    expect(dateFunctions.formatDate(undefined)).toBe("");
  });
  it("should return the correct format when the format parameter is passed", () => {
    expect(
      dateFunctions.formatDate(new Date(1573138431000), "dd/MM/yyyy")
    ).toBe("07/11/2019");
  });
  it("should return the correct format when the format parameter is not passed", () => {
    expect(dateFunctions.formatDate(new Date(1573138431000))).toBe(
      "07.11.2019"
    );
  });
});
