import { DateTime } from "luxon";
import { ScrollView, View, Text } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { luxonValidTimezones } from "./getValidTimezones";
import { Layout } from "./Layout";
import { TimezoneRow } from "./TimezoneRow";
import { useEffect, useState } from "react";

export const MainScreen = ({ timezones, onDelete }: { timezones: string[]; onDelete: (value: string) => void }) => {
  const [currentDate, setCurrentDate] = useState(DateTime.local({ locale: "en-GB" }));
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      const newDate = DateTime.local({ locale: "en-GB" });

      if (newDate.toFormat("YYYY-MM-DD HH:mm") !== currentDate.toFormat("YYYY-MM-DD HH:mm")) {
        setCurrentDate(newDate);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentDate]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          flexDirection: "column",
          zIndex: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        {timezones.map((zoneKey) => {
          const zone = luxonValidTimezones.get(zoneKey);

          return (
            <View style={{ flexDirection: "column" }} key={zoneKey}>
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  height: Layout.TimezoneHeaderHight,
                }}
              >
                <Chip style={{ borderRadius: 0, borderWidth: 1, borderColor: theme.colors.background }}>
                  <Text>{zone?.name}</Text>
                </Chip>
                <Chip style={{ borderRadius: 0, borderWidth: 1, borderColor: theme.colors.background }}>
                  <Text>{zone?.abbreviation}</Text>
                </Chip>
              </View>
              <View style={{ flexDirection: "row", height: Layout.TimezoneHight }} />
            </View>
          );
        })}
      </View>
      <View style={{ zIndex: 1 }}>
        <ScrollView horizontal>
          <View style={{ paddingBottom: 8 }}>
            {timezones.map((zone) => (
              <TimezoneRow currentDate={currentDate} zone={zone} key={zone} onDelete={() => onDelete(zone)} />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
