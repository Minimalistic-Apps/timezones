import { useColorScheme } from "react-native";

export namespace Colors {
	export function backgroundColor() {
		const isDarkMode = useColorScheme() === "dark";

		return isDarkMode ? "#1e1e1e" : "#ffffff";
	}

	export function night() {
		const isDarkMode = useColorScheme() === "dark";

		return isDarkMode ? "#4469AB" : "#95b3d7";
	}

	export function morningAndEvening() {
		const isDarkMode = useColorScheme() === "dark";

		return isDarkMode ? "#5E86EB" : "#edfbff";
	}

	export function day() {
		const isDarkMode = useColorScheme() === "dark";

		return isDarkMode ? "#918633" : "#fffff3";
	}

	export function highlight() {
		const isDarkMode = useColorScheme() === "dark";

		return isDarkMode ? "#C70700" : "red";
	}
}
