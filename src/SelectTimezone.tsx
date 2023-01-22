import { RawTimeZone } from "@vvo/tzdb";
import { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import ActionSheet, { registerSheet, SheetManager, SheetProps } from "react-native-actions-sheet";
import { Colors } from "./Colors";

const ExampleSheet = ({ sheetId, payload }: SheetProps<{ value: RawTimeZone[] }>) => {
  const backgroundStyle = { backgroundColor: Colors.backgroundColor() };

  return (
    <ActionSheet id={sheetId}>
      <View style={{ height: "100%" }}>
        <ScrollView contentInsetAdjustmentBehavior="always" style={backgroundStyle}>
          {(payload?.value ?? []).map((row) => (
            <Text key={row.name}>{row.name}</Text>
          ))}
        </ScrollView>
      </View>
    </ActionSheet>
  );
};

registerSheet("example-sheet", ExampleSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#8B93A5",
    padding: 10,
    borderRadius: 6,
    marginTop: 50,
  },
});

export const SelectTimezone = ({
  data,
  selected,
  onSelect,
}: { data: RawTimeZone[]; selected: RawTimeZone | null; onSelect: (value: RawTimeZone) => void }) => {
  const [query, setQuery] = useState("");

  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) => item.name.toLocaleLowerCase("en").includes(query.toLocaleLowerCase("en")));
    }

    return [];
  }, [data, query]);

  const onSearch = (text: string) => {
    setQuery(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          SheetManager.show("example-sheet", { payload: { value: filteredData } });
        }}
      >
        <Text>Open ActionSheet</Text>
      </TouchableOpacity>
      <Text style={{ padding: 10 }}>Chosen : {selected?.name}</Text>
    </View>
  );
};
