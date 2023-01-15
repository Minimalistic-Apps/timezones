import { DateTime } from "luxon";
import { getTimeZones } from "@vvo/tzdb";

export const luxonValidTimezones = [
  ...new Set<string>(
    getTimeZones()
      .map((tz) => tz.name)
      .filter((tz) => tz.includes("/") && DateTime.local().setZone(tz).isValid),
  ),
].sort((a, b) => (a < b ? -1 : 1));
