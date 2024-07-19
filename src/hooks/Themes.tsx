import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "./useLocalStorage.ts";

type Theme = "dark" | "light";

export const useTheme = () => {
	return useContext(ThemeContext);
};
const ThemeContext = createContext({} as {theme: Theme, setThemeAndStore: (theme: Theme) => void})

export function ThemeProvider({children}: {children?:ReactElement}) {
	const systemTheme = (window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false) ? "dark" : "light";
	const [lsTheme,setLSTheme] = useLocalStorage<Theme>("theme", systemTheme);
	const [theme, setTheme] = useState<Theme>(lsTheme); // Default theme is 'light'

	useEffect(() => {
		setTheme(systemTheme)
	}, []);

	const setThemeAndStore = (theme: Theme) => {
		setTheme(theme);
		setLSTheme(theme);
	}

	return (
		<ThemeContext.Provider value={{theme, setThemeAndStore}}>
			{children}
		</ThemeContext.Provider>
	);
}