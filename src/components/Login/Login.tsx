import { useState } from "react";
import {
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

interface IProps {
  onLogin: (isLogin: boolean) => void;
}

function Login(props: IProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [hasLogin, setHasLogin] = useState(true);
  const [hasPwd, setHasPwd] = useState(true);
  const [isEqual, setIsEqual] = useState(true);

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
  };

  const checkErrors = () => {
    setHasLogin(checkLogin());
    setHasPwd(checkPwd());
    if (isSignUp) setIsEqual(checkEqual());

    if (
      checkLogin() &&
      checkPwd() &&
      (!isSignUp || (isSignUp && checkEqual()))
    ) {
      onLogin();
    }
  };

  const checkLogin = () => login !== "";
  const checkPwd = () => password !== "";
  const checkEqual = () => password === password2;

  const handleSignIn = () => {
    console.log("call sign in api " + login + ":" + password);
    checkErrors();
  };

  const handleRegister = () => {
    console.log("call register api" + login + ":" + password + password2);
    checkErrors();
  };

  return (
    <Box sx={{ width: "300px" }}>
      <Card variant="outlined">
        <CardContent sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ m: 2 }}>
              {isSignUp ? "Choose login and password:" : "Please, log in:"}
            </Typography>
            <TextField
              id="login-register"
              label="Login"
              variant="outlined"
              onChange={(event) => setLogin(event.target.value)}
              error={!hasLogin}
              helperText={!hasLogin ? "Login cannot be empty" : ""}
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
