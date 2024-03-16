import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  FormControlLabel,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import Login from "./components/Login/Login";
import UserTable from "./components/UserTable/UserTable";
import { ILogInResponse, IUser } from "./interfaces";
import { getUserByID } from "./services";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  //michael.lawson@reqres.in

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const darkTheme = localStorage.getItem("darkTheme");
    setIsDarkTheme(darkTheme === "true");

    const fetchUserData = async () => {
      try {
        const id = sessionStorage.getItem("id");
        if (id) {
          const res = await getUserByID(id);
          setUserInfo(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (sessionStorage.getItem("token")) {
      fetchUserData();
    }
  }, []);

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light",
    },
  });

  const toggleDarkTheme = () => {
    const toggledTheme = !isDarkTheme;
    setIsDarkTheme(toggledTheme);
    localStorage.setItem("darkTheme", toggledTheme.toString());
  };

  const handleLogIn = async (response: ILogInResponse) => {
    try {
      const { id, token } = response;
      if (id && token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", id);
        const res = await getUserByID(id);
        setUserInfo(res.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {token ? (
          userInfo ? (
            <Stack>
              <Typography variant="h6" sx={{ p: 2 }}>
                Hello, {userInfo?.first_name}!
              </Typography>
              <UserTable />
            </Stack>
          ) : (
            <CircularProgress />
          )
        ) : (
          <Login onLogin={handleLogIn} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
