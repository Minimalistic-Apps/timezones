import React, { useState } from "react";
import { SafeAreaView, useColorScheme, View } from "react-native";
import { usePersistedState } from "./src/usePersistedState";
import { luxonValidTimezones } from "./src/getValidTimezones";
import { AddTimezoneScreen } from "./src/AddTimezoneScreen";
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider, Appbar, MD3Theme } from "react-native-paper";
import { MainScreen } from "./src/MainScreen";

const App = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [timezones, setTimezones] = usePersistedState("timezones", ["Europe/Prague", "America/New_York"]);

  const availableTimezones = Array.from(luxonValidTimezones.values()).filter((tz) => !timezones.includes(tz.name));

  const isDarkMode = useColorScheme() === "dark";
  const DefaultTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;

  // Todo: consolidate colors (https://github.com/Minimalistic-Apps/price-converter/blob/master/app/src/main/java/com/minimalisticapps/priceconverter/presentation/ui/theme/Color.kt)
  const theme: MD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkMode ? "#1e1e1e" : "#ffffff",
      primary: isDarkMode ? "#087d89" : "#087d89",
      secondary: isDarkMode ? "#50a03b" : "#3d8c31",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <View style={{ flexDirection: "column", height: "100%" }}>
          <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
            {showAdd ? <Appbar.BackAction onPress={() => setShowAdd(false)} /> : null}
            <Appbar.Content title="Timezones" />
            {showAdd ? null : <Appbar.Action icon="plus" onPress={() => setShowAdd(true)} />}
          </Appbar.Header>
          {showAdd ? (
            <AddTimezoneScreen
              data={availableTimezones}
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
