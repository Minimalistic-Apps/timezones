import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { DateTime } from "luxon";
import { Colors } from "./src/Colors";
import { TimezoneRow } from "./src/TimezoneRow";
import { Layout } from "./src/Layout";
import { usePersistedState } from "./src/usePersistedState";
import SelectDropdown from "react-native-select-dropdown";
import { luxonValidTimezones } from "./src/getValidTimezones";

const App = () => {
  const backgroundStyle = { backgroundColor: Colors.backgroundColor() };
  const [timezoneQuery, setTimezoneQuery] = useState<string>("");
  const date = DateTime.local();

  const [timezones, setTimezones] = usePersistedState("timezones", ["Europe/Prague", "America/New_York"]);

  const availableTimezones = luxonValidTimezones.filter(
    (tz) => tz.toLowerCase().includes(timezoneQuery.toLowerCase()) && !timezones.includes(tz),
  );

  return (
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
            {timezones.map((zone) => {
              return (
                <View style={{ flexDirection: "column" }} key={zone}>
                  <View
                    style={{
                      position: "relative",
                      height: Layout.TimezoneHeaderHight,
                      paddingStart: 4,
                      paddingEnd: 4,
                    }}
                  >
                    <Text>{zone}</Text>
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
        <View style={{ flexDirection: "row" }}>
          <SelectDropdown
            buttonStyle={{ width: "100%", borderRadius: 10 }}
            rowStyle={{ alignItems: "flex-start", justifyContent: "flex-start" }}
            search={true}
            data={availableTimezones}
            onSelect={(value) => {
              setTimezones([...new Set([...timezones, value])]);
            }}
            onChangeSearchInputText={setTimezoneQuery}
            onBlur={() => setTimezoneQuery("")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
