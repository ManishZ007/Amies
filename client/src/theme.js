const primary = {
  main: "#3f50b5",
  light: "#757ce8",
  dark: "#002884",
  contrastText: "#fff",
};

export const themeSetting = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // values for dark mode
            primary: primary,
            background: {
              paper: "#000117",
              default: "#000000",
              alt: "#1c1c1c",
            },
            neutral: {
              main: "#ffffff",
              light: "#bdbdbd",
              subtitle: "#1c68cf",
            },
          }
        : {
            // values for light mode
            primary: primary,
            background: {
              paper: "#fcfbf4",
              default: "#ffffff",
              alt: "#f4f6fb",
            },
            neutral: {
              main: "#000000",
              light: "#666666",
              subtitle: "#1c68cf",
            },
          }),
    },
  };
};
