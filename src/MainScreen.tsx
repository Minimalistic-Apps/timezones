import { DateTime } from "luxon";
import { ScrollView, View, Text } from "react-native";
import { luxonValidTimezones } from "./getValidTimezones";
import { Layout } from "./Layout";
import { TimezoneRow } from "./TimezoneRow";

export const MainScreen = ({ timezones, onDelete }: { timezones: string[]; onDelete: (value: string) => void }) => {
  const date = DateTime.local({ locale: "en-GB" });

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          flexDirection: "column",
          zIndex: 0,
          position: "absolute",
        }}
      >
        {timezones.map((zoneKey) => {
          const zone = luxonValidTimezones.get(zoneKey);

          return (
            <View style={{ flexDirection: "column" }} key={zoneKey}>
              <View
                style={{
                  position: "relative",
                  height: Layout.TimezoneHeaderHight,
                  paddingStart: 4,
                  paddingEnd: 4,
                }}
              >
                <Text>
                  {zone?.name} | {zone?.abbreviation}
                </Text>
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
              <TimezoneRow date={date} zone={zone} key={zone} onDelete={() => onDelete(zone)} />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
