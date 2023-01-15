import React from "react";
import { useEffect } from "react";

export function usePersistedState(key: string, defaultValue: string) {
	const [state, setState] = React.useState(
		() => JSON.parse(localStorage.getItem(key)) || defaultValue,
	);
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);
	return [state, setState];
}
