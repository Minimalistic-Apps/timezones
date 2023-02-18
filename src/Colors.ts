import { useColorScheme } from "react-native";

export namespace Colors {
  export function night() {
    const isDarkMode = useColorScheme() === "dark";

    return isDarkMode ? "#4469AB" : "#b0d5fe";
  }

  export function morningAndEvening() {
    const isDarkMode = useColorScheme() === "dark";

    return isDarkMode ? "#5E86EB" : "#daeeee";
  }

  export function day() {
    const isDarkMode = useColorScheme() === "dark";

    return isDarkMode ? "#918633" : "#ffffe7";
  }

  export function highlight() {
    const isDarkMode = useColorScheme() === "dark";

    return isDarkMode ? "#C70700" : "red";
  }

  export function border() {
    const isDarkMode = useColorScheme() === "dark";

    return isDarkMode ? "black" : "white";
  }
}
