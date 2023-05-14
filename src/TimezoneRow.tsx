import { DateTime } from "luxon";
import { Pressable, View } from "react-native";
import { HourBox } from "./HourBox";
import { Layout } from "./Layout";
import { range } from "./range";

interface Props {
  currentDate: DateTime;
  zone: string;
  onDelete: () => void;
}

export const TimezoneRow = ({ currentDate, zone, onDelete }: Props) => {
  const zonedCurrentDate = currentDate.setZone(zone);

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
            const hour = zonedCurrentDate.plus({ hours: i }).hour;

            const isCurrent = hour === zonedCurrentDate.hour;

            return <HourBox hour={hour} isCurrent={isCurrent} key={i} />;
          })}
        </View>
      </View>
    </Pressable>
  );
};
