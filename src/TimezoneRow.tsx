import { DateTime } from "luxon";
import { View } from "react-native";
import { HourBox } from "./HourBox";
import { Layout } from "./Layout";
import { range } from "./range";

export const TimezoneRow = ({
	date,
	zone,
}: { date: DateTime; zone: string }) => {
	const zonedDate = date.setZone(zone);

	return (
		<View style={{ flexDirection: "column" }}>
			<View
				style={{ position: "relative", height: Layout.TimezoneHeaderHight }}
			/>
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
	);
};
