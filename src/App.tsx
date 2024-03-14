import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  CssBaseline,
  FormControlLabel,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import "./App.css";
import Login from "./components/Login/Login";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const darkTheme = localStorage.getItem("darkTheme");
    setIsDarkTheme(darkTheme === "true");
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
    },
  });

  const toggleDarkTheme = () => {
    const newToggletTheme = !isDarkTheme;
    setIsDarkTheme(newToggletTheme);
    localStorage.setItem("darkTheme", newToggletTheme.toString());
  };

  const handleLogIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h5">
            Dashboard test
          </Typography>
          <FormControlLabel
            control={
              <Switch checked={isDarkTheme} onChange={toggleDarkTheme} />
            }
            label="Toggle dark/light theme"
          />
        </Toolbar>
      </AppBar>
      <div className="main_container">
        {isLoggedIn ? (
          <Stack>
            <Typography variant="h5">Hello, user!</Typography>
            <Typography>Users data</Typography>
          </Stack>
        ) : (
          <Login onLogin={handleLogIn} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
