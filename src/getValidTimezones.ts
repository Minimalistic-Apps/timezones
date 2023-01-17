import { DateTime } from "luxon";
import { RawTimeZone, rawTimeZones } from "@vvo/tzdb";


export const luxonValidTimezones = new Map<string, RawTimeZone>(
    rawTimeZones.filter((tz) => DateTime.local().setZone(tz.name).isValid).map(tz => [tz.name, tz])
  )
