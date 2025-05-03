import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    ipadPro: true;
  }
}

const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      ipadPro: 1024,
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    subtitle1: {
      fontFamily: "Poppins",
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: "0.00938em",
      color: "#23AFC4",
      fontSize: "1.12rem",
    },
    subtitle2: {
      fontFamily: "Poppins",
      color: "#000000",
      fontWeight: 500,
      textAlign: "center",
      margin: "4rem 0",
      fontSize: "2.5rem",
      marginTop: 0,
    },
    h6: {
      fontFamily: "Poppins",
      fontWeight: 400,
      textAlign: "center",
      color: "#000000",
    },
    h5: {
      fontFamily: "Poppins",
      fontWeight: 400,
      textAlign: "center",
      color: "#444444",
    },
    h4: {
      fontFamily: "Poppins",
      fontWeight: 500,
      textAlign: "center",
      color: "#444444",
    },
    h3: {
      fontFamily: "Poppins",
      fontWeight: 600,
      textAlign: "center",
      color: "#000000",
    },
    h2: {
      fontFamily: "Poppins",
      fontWeight: 700,
      textAlign: "center",
      color: "#777777",
    },
  },
  palette: {
    mode: "light",
    action: {
      disabledBackground: "#0F9BB0",
    },
    primary: {
      main: "#0F9BB0",
    },
    secondary: {
      main: "#23AFC4",
    },
    background: {
      default: "#edf4f6",
    },
    divider: "#FFF",
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontWeight: 200,
            fontSize: "1rem",
            fontFamily: "Poppins, sans-serif !important",
            color: "rgba(0, 0, 0, 0.87) !important",
          },
          "& .MuiFormLabel-root": {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif !important',
            fontWeight: 200,
            fontSize: "1rem",
          },
          "& .MuiFormHelperText-root": {
            color: "rgba(0, 0, 0, 0.87) !important",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#0F9BB0",
              paddingTop: "10.5px !important",
              paddingBottom: "10.5px !important",
              fontFamily:
                '"Roboto", "Helvetica", "Arial", sans-serif !important',
              fontWeight: 200,
              fontSize: "1rem",
            },
          },
          "& .MuiFormLabel-root.Mui-error": {
            color: "gray !important",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif !important',
            fontWeight: 200,
            fontSize: "1rem",
          },
          "&:hover fieldset": {
            borderColor: "#0F9BB0 !important",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Poppins, sans-serif",
          fontSize: "1.12rem",
          lineHeight: "1.25rem",
          fontWeight: 500,
          textTransform: "capitalize",
        },
        containedPrimary: {
          color: "#FFF !important",
          backgroundColor: "#23AFC4",
          width: "17.3rem",
          marginTop: "2.75rem",
          marginBottom: "1.12rem",
          "&:disabled": {
            opacity: 0.5,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#0F9BB0",
          "&.Mui-checked": {
            color: "#23AFC4",
          },
          "&.MuiCheckbox-indeterminate": {
            color: "#FF0000",
          },
          "&.Mui-disabled": {
            color: "#23AFC4",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "54px !important",
          "@media (min-width:600px)": {
            minHeight: "54px !important",
            paddingLeft: "20px",
            paddingRight: "20px",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "#313131",
          color: "#DADADA",
          fontFamily: "Poppins",
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "20px",
          textAlign: "left",
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
          top: "45px !important",
          right: "20px !important",
          left: "auto !important",
          transformOrigin: "top right",
          boxShadow:
            "0px 5px 15px rgba(0, 0, 0, 0.2), 0px 3px 10px rgba(0, 0, 0, 0.1)",
        },
        list: {
          "& .MuiMenuItem-root": {
            "&:hover": {
              color: "#FFF",
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#313131",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          color: "#FFF",
          cursor: "pointer",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    subtitle1: {
      fontFamily: "Poppins",
      color: "#000000",
    },

    subtitle2: {
      fontFamily: "Poppins",
      color: "#000000",
      fontWeight: 500,
      textAlign: "center",
    },
    h6: {
      fontFamily: "Poppins",
      fontWeight: 400,
      textAlign: "center",
      color: "#000000",
    },
    h3: {
      fontFamily: "Poppins",
      fontWeight: 600,
      textAlign: "center",
      color: "#000000",
    },
    h5: {
      fontFamily: "Poppins",
      fontWeight: 500,
      textAlign: "center",
      color: "#444444",
    },
    h4: {
      fontFamily: "Poppins",
      fontWeight: 400,
      textAlign: "center",
      color: "#444444",
    },
    h2: {
      fontFamily: "Poppins",
      fontWeight: 400,
      textAlign: "center",
      color: "#777777",
    },
  },
  palette: {
    mode: "light",
    action: {
      disabledBackground: "#0F9BB0",
    },
    primary: {
      main: "#0F9BB0",
    },
    secondary: {
      main: "#FF0000",
    },
    background: {
      default: "#edf4f6",
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#0F9BB0",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#0F9BB0",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#FF0000",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#0F9BB0",
            },
          },
          "& .MuiFormLabel-root.Mui-error": {
            color: "gray !important",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            color: "red !important",
          },
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
            color: "black",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#0F9BB0",
          "&.Mui-checked": {
            color: "#db3131",
          },
          "&.MuiCheckbox-indeterminate": {
            color: "#db3131",
          },
          "&.Mui-disabled": {
            color: "#db3131",
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
