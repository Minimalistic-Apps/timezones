import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { DateTime } from "luxon";
import { Colors } from "./src/Colors";
import { TimezoneRow } from "./src/TimezoneRow";
import { Layout } from "./src/Layout";
import { usePersistedState } from "./src/usePersistedState";
import { luxonValidTimezones } from "./src/getValidTimezones";
import { SelectTimezone } from "./src/SelectTimezone";
import { SheetProvider } from "react-native-actions-sheet";

/**
 * TODO:
 *
 * 1. try some material design lib: https://callstack.github.io/react-native-paper/index.html
 * 2. finish select box using action-sheet with scrolling and full-text search (https://rnas.vercel.app/guides/passingdata)
 * 3. support date theme (use library that supports that)
 */

const App = () => {
  const backgroundStyle = { backgroundColor: Colors.backgroundColor() };
  const date = DateTime.local({ locale: "en-GB" });

  const [timezones, setTimezones] = usePersistedState("timezones", ["Europe/Prague", "America/New_York"]);

  const availableTimezones = Array.from(luxonValidTimezones.values()).filter((tz) => !timezones.includes(tz.name));

  return (
    <SheetProvider>
      <SafeAreaView style={backgroundStyle}>
        <View style={{ flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
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
                    <TimezoneRow
                      date={date}
                      zone={zone}
                      key={zone}
                      onDelete={() => {
                        setTimezones(timezones.filter((tz) => tz !== zone));
                      }}
                    />
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
          <View style={{ flexDirection: "row", width: "100%", backgroundColor: "blue" }}>
            <SelectTimezone
              data={availableTimezones}
              selected={null}
              onSelect={(value) => {
                setTimezones([...new Set([...timezones, value.name])]);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </SheetProvider>
  );
};

export default App;
