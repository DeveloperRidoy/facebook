const toggleDarkMode = (darkMode) => {

    if (darkMode === null) {
        if (localStorage.theme === 'dark' || !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            document.body.style.backgroundColor = '#242526';
        } else {
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = '#F0F2F5';
        }
        return;
    } 

    if (darkMode) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
        document.body.style.backgroundColor = '#242526';
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
         document.body.style.backgroundColor = '#F0F2F5';
    }
}


export default toggleDarkMode;