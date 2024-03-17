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
import { INPUT_MAX_LENGTH } from "../../consts";
import { ILogInResponse } from "../../interfaces";
import { register } from "../../services";

interface IProps {
  onLogin: (response: ILogInResponse) => void;
}

function Login(props: IProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [hasLogin, setHasLogin] = useState<boolean>(true);
  const [hasPwd, setHasPwd] = useState<boolean>(true);
  const [isEqual, setIsEqual] = useState<boolean>(true);
  const [errorText, setErrorText] = useState<string>("");

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
      try {
        const resJSON = await register(login, password);
        if (resJSON.error) {
          setErrorText(resJSON.error);
        } else {
          onLogin(resJSON);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRegister = async () => {
    if (checkErrors()) {
      try {
        const resJSON = await register(login, password);
        if (resJSON.error) {
          setErrorText(resJSON.error);
        } else {
          onLogin(resJSON);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const checkErrors = (): boolean => {
    const hasLoginError = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
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
    <Box sx={{ width: "300px", mt: 12 }}>
      {errorText && (
        <Alert severity="error" data-cy="login-alert" sx={{ mb: 2 }}>
          {errorText}
        </Alert>
      )}
      <Card variant="outlined">
        <CardContent sx={{ p: 2 }} data-cy="card-content">
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ m: 2 }}>
              {isSignUp ? "Enter email and password:" : "Please, log in:"}
            </Typography>
            <TextField
              data-cy="login-input"
              id="login-register"
              label="Email"
              variant="outlined"
              onChange={(event) => setLogin(event.target.value)}
              error={!hasLogin}
              helperText={!hasLogin ? "Email must be valid" : ""}
              inputProps={{
                maxLength: INPUT_MAX_LENGTH,
              }}
            />
            <TextField
              data-cy="password-input"
              id="pwd-register"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
              error={!hasPwd}
              helperText={!hasPwd ? "Password cannot be empty" : ""}
              inputProps={{
                maxLength: INPUT_MAX_LENGTH,
              }}
            />
            {isSignUp && (
              <TextField
                data-cy="password2-input"
                id="pwd-register2"
                label="Retype password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(event) => setPassword2(event.target.value)}
                error={!isEqual}
                helperText={!isEqual ? "Passwords must be equal" : ""}
                inputProps={{
                  maxLength: INPUT_MAX_LENGTH,
                }}
              />
            )}
          </Stack>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
          {isSignUp ? (
            <Container>
              <Button
                data-cy="register-button"
                variant="contained"
                sx={{ m: 1 }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Button
                data-cy="back-button"
                variant="outlined"
                sx={{ m: 1 }}
                onClick={handleBack}
              >
                Back
              </Button>
            </Container>
          ) : (
            <Container>
              <Button
                data-cy="sign-in-button"
                variant="contained"
                sx={{ m: 1 }}
                onClick={handleSignIn}
              >
                Sign in
              </Button>
              <Button
                data-cy="sign-up-button"
                variant="outlined"
                sx={{ m: 1 }}
                onClick={handleSignUp}
              >
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
