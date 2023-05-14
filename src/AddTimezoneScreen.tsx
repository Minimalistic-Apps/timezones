import { RawTimeZone } from "@vvo/tzdb";
import { useState, useMemo } from "react";
import { View, FlatList } from "react-native";
import { Chip, Divider, Menu, Searchbar, Text, useTheme } from "react-native-paper";

const ITEM_HEIGHT = 50;

const getItemLayout = (data: RawTimeZone[] | null | undefined, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export const AddTimezoneScreen = ({
  data,
  onSelect,
}: { data: RawTimeZone[]; onSelect: (value: RawTimeZone) => void }) => {
  const [query, setQuery] = useState("");

  const theme = useTheme();

  const filteredData = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter((item) => item.name.toLocaleLowerCase("en").includes(query.toLocaleLowerCase("en")));
    }

    return [];
  }, [data, query]);

  const onSearch = (text: string) => {
    setQuery(text);
  };

  const renderItem = ({ item }: { item: RawTimeZone }) => (
    <View key={item.name}>
      <Chip
        onPress={() => onSelect(item)}
        style={{
          borderRadius: 0,
          borderWidth: 1,
          borderColor: theme.colors.background,
          height: 50,
        }}
      >
        <Text>{item.name}</Text>
      </Chip>
      <Divider />
    </View>
  );

  return (
    <View style={{ flexDirection: "column", flexWrap: "wrap", flex: 1 }}>
      <Searchbar placeholder="Search" onChangeText={onSearch} value={query} />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={40}
        maxToRenderPerBatch={20}
        windowSize={40}
      />
    </View>
  );
};
