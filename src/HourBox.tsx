import { Text } from "react-native";
import { Colors } from "./Colors";
import { Layout } from "./Layout";

function getBackgroundColor(hour: number) {
	if (hour < 6) {
		return Colors.night();
	}

	if (hour < 8) {
		return Colors.morningAndEvening();
	}

	if (hour < 18) {
		return Colors.day();
	}

	if (hour < 22) {
		return Colors.morningAndEvening();
	}

	return Colors.night();
}

export const HourBox = ({ hour, now }: { hour: number; now: boolean }) => {
	return (
		<Text
			style={{
				fontSize: 36,
				width: Layout.TimezoneWidth,
				height: Layout.TimezoneHight,
				backgroundColor: getBackgroundColor(hour),
				borderWidth: 1,
				borderColor: now ? Colors.highlight() : Colors.backgroundColor(),
				textAlign: "center",
				padding: 2,
			}}
		>
			{hour}
		</Text>
	);
};
