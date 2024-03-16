import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { logIn, register } from "../../services";
import { ILogInResponse } from "../../interfaces";

interface IProps {
  onLogin: (response: ILogInResponse) => void;
}

function Login(props: IProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [hasLogin, setHasLogin] = useState(true);
  const [hasPwd, setHasPwd] = useState(true);
  const [isEqual, setIsEqual] = useState(true);
  const [errorText, setErrorText] = useState("");

  const { onLogin } = props;

  const handleSignUp = () => {
    setIsSignUp(true);
    resetErrors();
  };
  const handleBack = () => {
    setIsSignUp(false);
    resetErrors();
  };

  const resetErrors = () => {
    setHasLogin(true);
    setHasPwd(true);
    setIsEqual(true);
    setErrorText("");
  };

  //I have to use register method for signing in instead of logIn,
  //because logIn API returns only token without user id.
  //This is insufficient to get user data and display user's name.
  //In real project I would surely discuss this issue with backend developers to add the id in the response.
  //The other option could be loading all users and find the one with specified email among them,
  //but this is a totally wrong approach in my opinion.
  const handleSignIn = async () => {
    if (checkErrors()) {
      const resJSON = await register(login, password);
      if (resJSON.error) {
        setErrorText(resJSON.error);
      } else {
        onLogin(resJSON);
      }
    }
  };

  const handleRegister = async () => {
    if (checkErrors()) {
      const resJSON = await register(login, password);
      if (resJSON.error) {
        setErrorText(resJSON.error);
      } else {
        onLogin(resJSON);
      }
    }
  };

  const checkErrors = (): boolean => {
    const hasLoginError = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      login
    );
    const hasPwdError = password !== "";
    const hasEqualityError = password === password2;
    setHasLogin(hasLoginError);
    setHasPwd(hasPwdError);
    if (isSignUp) setIsEqual(hasEqualityError);
    return (
      hasLoginError &&
      hasPwdError &&
      (!isSignUp || (isSignUp && hasEqualityError))
    );
  };

  return (
    <Box sx={{ width: "300px" }}>
      {errorText && <Alert severity="error">{errorText}</Alert>}
      <Card variant="outlined">
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ m: 2 }}>
              {isSignUp ? "Enter email and password:" : "Please, log in:"}
            </Typography>
            <TextField
              id="login-register"
              label="Email"
              variant="outlined"
              onChange={(event) => setLogin(event.target.value)}
              error={!hasLogin}
              helperText={!hasLogin ? "Email must be valid" : ""}
            />
            <TextField
              id="pwd-register"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              error={!hasPwd}
              helperText={!hasPwd ? "Password cannot be empty" : ""}
            />
            {isSignUp && (
              <TextField
                id="pwd-register2"
                label="Retype password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(event) => setPassword2(event.target.value)}
                error={!isEqual}
                helperText={!isEqual ? "Passwords must be equal" : ""}
              />
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          {isSignUp ? (
            <Container>
              <Button
                variant="contained"
                sx={{ m: 1 }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Button variant="outlined" sx={{ m: 1 }} onClick={handleBack}>
                Back
              </Button>
            </Container>
          ) : (
            <Container>
              <Button variant="contained" sx={{ m: 1 }} onClick={handleSignIn}>
                Sign in
              </Button>
              <Button variant="outlined" sx={{ m: 1 }} onClick={handleSignUp}>
                Sign up
              </Button>
            </Container>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}

export default Login;
