import { DARK, LIGHT } from "../global/variables";

const toggleTheme = (theme, setState) => {
  theme === null
    ? window.matchMedia("(prefers-color-scheme: dark)")
      ? switchTo(DARK)
      : switchTo(LIGHT)
    : theme === DARK
    ? switchTo(DARK)
    : switchTo(LIGHT);

  if (setState) setState((state) => ({ ...state, themeUpdated: true }));
};

export default toggleTheme;

const switchTo = (mode) => {
  localStorage.theme = mode;
  mode === DARK
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
};
