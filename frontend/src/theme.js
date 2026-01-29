import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#8cd9ee",
    },
    background: {
      default: "#1a1f2b",
      paper: "#1a1f2b",
    },
    error: {
      main: "#ff4c4c",
    },
    warning: {
      main: "#ffc107",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
  },

  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#2b67cd",
            color: "#ffffff",
          },
        },
      },
    },
    
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.85rem",
        },
      },
    },
  },
});
