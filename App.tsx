import React, { useState } from "react";
import { SafeAreaView, useColorScheme, View } from "react-native";
import { Colors } from "./src/Colors";
import { usePersistedState } from "./src/usePersistedState";
import { luxonValidTimezones } from "./src/getValidTimezones";
import { AddTimezoneScreen } from "./src/AddTimezoneScreen";
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider, Text, Appbar } from "react-native-paper";
import { MainScreen } from "./src/MainScreen";

const App = () => {
  const backgroundStyle = { backgroundColor: Colors.backgroundColor() };

  const [showAdd, setShowAdd] = useState(false);

  const [timezones, setTimezones] = usePersistedState("timezones", ["Europe/Prague", "America/New_York"]);

  const availableTimezones = Array.from(luxonValidTimezones.values()).filter((tz) => !timezones.includes(tz.name));

  const isDarkMode = useColorScheme() === "dark";
  const DefaultTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <View style={{ flexDirection: "column", height: "100%" }}>
          <Appbar.Header>
            {showAdd ? (
              <Appbar.BackAction
                onPress={() => {
                  setShowAdd(false);
                }}
              />
            ) : null}
            <Appbar.Content title="Title" />
            {showAdd ? null : (
              <Appbar.Action
                icon="plus"
                onPress={() => {
                  setShowAdd(true);
                }}
                style={{ backgroundColor: "red" }}
              />
            )}
          </Appbar.Header>
          {showAdd ? (
            <AddTimezoneScreen
              data={availableTimezones}
              selected={null}
              onSelect={(value) => {
                setTimezones([...new Set([...timezones, value.name])]);
                setShowAdd(false);
              }}
            />
          ) : (
            <MainScreen
              timezones={timezones}
              onDelete={(zone) => {
                setTimezones(timezones.filter((tz) => tz !== zone));
              }}
            />
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
