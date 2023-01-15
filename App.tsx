import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { DateTime } from "luxon";
import { Colors } from "./src/Colors";
import { TimezoneRow } from "./src/TimezoneRow";
import { Layout } from "./src/Layout";
import { usePersistedState } from "./src/usePersistedState";

const App = () => {
	const backgroundStyle = { backgroundColor: Colors.backgroundColor() };

	const date = DateTime.local();

	const [timezones, setTimezones] = usePersistedState("timezones", [
		"Europe/Prague",
		"America/New_York",
	]);

	return (
		<SafeAreaView style={backgroundStyle}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}
			>
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
								<View
									style={{ flexDirection: "row", height: Layout.TimezoneHight }}
								/>
							</View>
						);
					})}
				</View>
				<View style={{ zIndex: 1 }}>
					<ScrollView horizontal>
						<View style={{ paddingBottom: 8 }}>
							{timezones.map((zone) => (
								<TimezoneRow date={date} zone={zone} key={zone} />
							))}
						</View>
					</ScrollView>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default App;
