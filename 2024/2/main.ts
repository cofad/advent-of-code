type Report = number[];

export function partOne(data: string): number {
  const reports = extractReports(data);
  const numSafeReports = reports.filter((report) => isSafeReport(report)).length;
  return numSafeReports;
}

export function partTwo(data: string): number {
  const reports = extractReports(data);
  const numSafeReports = reports.filter((report) => isSafeReportDampened(report)).length;
  return numSafeReports;
}

function extractReports(data: string): Report[] {
  const reports = data.split("\n").map((line) => line.split(" ").map((word) => parseInt(word)));
  return reports;
}

function isReportAlwaysIncreasing(report: Report): boolean {
  return report.every((level, index) => {
    const nextLevel = report[index + 1];

    if (!nextLevel) {
      return true;
    }

    return nextLevel > level;
  });
}

function isReportAlwaysDecreasing(report: Report): boolean {
  return report.every((level, index) => {
    const nextLevel = report[index + 1];

    if (!nextLevel) {
      return true;
    }

    return nextLevel < level;
  });
}

function doReportLevelsDifferByAtMostThree(report: Report): boolean {
  return report.every((level, index) => {
    const nextLevel = report[index + 1];

    if (!nextLevel) {
      return true;
    }

    return Math.abs(nextLevel - level) <= 3;
  });
}

function isSafeReport(report: Report): boolean {
  return (
    (isReportAlwaysIncreasing(report) || isReportAlwaysDecreasing(report)) &&
    doReportLevelsDifferByAtMostThree(report)
  );
}

function isSafeReportDampened(report: Report): boolean {
  return report.some((_level, i) => {
    const reportWithCurrentLevelRemoved = [...report.slice(0, i), ...report.slice(i + 1)];
    return isSafeReport(reportWithCurrentLevelRemoved);
  });
}
