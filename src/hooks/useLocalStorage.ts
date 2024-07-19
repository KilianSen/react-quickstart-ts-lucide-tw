import React from "react";

export function useLocalStorage<Type>(storageKey: string, fallbackState: Type): [Type, React.Dispatch<Type>] {
	const [value, setValue] = React.useState(
		JSON.parse(<string>localStorage.getItem(storageKey as string)) ?? fallbackState
	);

	React.useEffect(() => {
		localStorage.setItem(storageKey, JSON.stringify(value));
	}, [value, storageKey]);

	return [value, setValue];
}

