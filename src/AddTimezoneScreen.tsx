import { RawTimeZone } from "@vvo/tzdb";
import { useState, useMemo } from "react";
import { View, FlatList } from "react-native";
import { Divider, Menu, Searchbar } from "react-native-paper";

const ITEM_HEIGHT = 50;

const getItemLayout = (data: RawTimeZone[] | null | undefined, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

export const AddTimezoneScreen = ({
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

  const renderItem = ({ item }: { item: RawTimeZone }) => (
    <View key={item.name}>
      <Menu.Item title={item.name} onPress={() => onSelect(item)} />
      <Divider />
    </View>
  );

  return (
    <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
      <Searchbar placeholder="Search" onChangeText={onSearch} value={query} />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={40}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};
