import { useState , useEffect} from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export function usePersistedState<T>(key: string, defaultValue: T) {
	const { getItem, setItem } = useAsyncStorage(key);

	const [state, setState] = useState<T>(defaultValue)
	
	useEffect(() => {
		(async () => {
			const data = await getItem();
	
			setState((data ? JSON.parse(data): undefined) ?? defaultValue)
		})()
	}, [key]);

	useEffect(() => {
		(async () => await setItem(JSON.stringify(state)))();
	}, [key, state]);

	return [state, setState] as [T, typeof setState];
}
