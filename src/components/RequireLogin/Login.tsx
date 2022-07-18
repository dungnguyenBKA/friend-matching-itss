import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { verifyUser } from '../../firebase';
import useAuth from '../../hooks/useAuth';

const Login = ({ setIsLogin }) => {
  const auth = useAuth();

  const [showPass, setShowPass] = useState(false);
  const handelShowPass = () => setShowPass(!showPass);
  const handelMouseDown = () => setShowPass(!showPass);

  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [hasErr, setHasErr] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await verifyUser({ email, passwd });
    setHasErr(!user);
    if (user) {
      auth.signIn(user);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh', background: '#f5f2ea' }}
    >
      <form onSubmit={handleLogin}>
        <Card style={{ minWidth: '420px' }} align-items="center">
          <CardContent>
            <Typography variant="h4" align="center">
              Welcome back
            </Typography>
            <div style={{ margin: '2.5em' }} />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="password"
              type={showPass ? 'text' : 'password'}
              required
              value={passwd}
              onChange={(e) => setPasswd(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      area-label="toggle password visibility"
                      onClick={handelShowPass}
                      onMouseDown={handelMouseDown}
                    >
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {hasErr && (
              <Typography color="error">Email or password wrong!!</Typography>
            )}
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth color="primary" variant="contained">
              Login
            </Button>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={() => setIsLogin(false)}
            >
              Or Signup
            </Button>
          </CardActions>
          <div style={{ marginBottom: '2em' }} />
        </Card>
      </form>
    </Grid>
  );
};

export default Login;
