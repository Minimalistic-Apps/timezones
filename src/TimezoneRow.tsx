import { DateTime } from "luxon";
import { Pressable, View } from "react-native";
import { HourBox } from "./HourBox";
import { Layout } from "./Layout";
import { range } from "./range";

interface Props {
  date: DateTime;
  zone: string;
  onDelete: () => void;
}

export const TimezoneRow = ({ date, zone, onDelete }: Props) => {
  const zonedDate = date.setZone(zone);

  return (
    <Pressable onLongPress={onDelete}>
      <View style={{ flexDirection: "column" }}>
        <View style={{ position: "relative", height: Layout.TimezoneHeaderHight }} />
        <View
          style={{
            flexDirection: "row",
            height: Layout.TimezoneHight,
          }}
        >
          {range(-4, -4 + 24).map((i) => {
            const hour = zonedDate.plus({ hours: i }).hour;

            return <HourBox hour={hour} now={hour === zonedDate.hour} key={i} />;
          })}
        </View>
      </View>
    </Pressable>
  );
};
