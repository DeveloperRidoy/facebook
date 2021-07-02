import { DARK, LIGHT } from "../../server/utils/variables";

const toggleTheme = (theme) => {
  if (theme === null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    return;
  }

  if (theme === DARK) {
    return document.documentElement.classList.add('dark');
  }

  if (theme === LIGHT) {
    return document.documentElement.classList.remove('dark');
  }
};

export default toggleTheme;
