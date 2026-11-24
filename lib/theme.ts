// Runs in <head> before the page paints, so a saved theme never flashes the other one first.
// Kept out of the "use client" toggle: a server component importing a plain value from a client module gets a reference, not the string.
export const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;
