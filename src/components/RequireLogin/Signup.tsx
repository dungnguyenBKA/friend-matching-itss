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
import { addUser } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import UserModel from '../../models/UserModel';

const Signup = ({ setIsLogin }) => {
  const auth = useAuth();

  const [showPass, setShowPass] = useState(false);
  const handelShowPass = () => setShowPass(!showPass);
  const handelMouseDown = () => setShowPass(!showPass);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwd, setPasswd] = useState('');
  const [hasErr, setHasErr] = useState<string | null>(null);

  const handelSignup = async (e) => {
    e.preventDefault();
    const res = await addUser({ name, email, passwd });
    if (res instanceof String) {
      setHasErr(res as string);
    } else {
      auth.signIn(res as UserModel);
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
      <form onSubmit={handelSignup}>
        <Card style={{ width: '480px' }} align-items="center">
          <CardContent>
            <Typography variant="h4" align="center">
              Welcome to our platform
            </Typography>
            <div style={{ margin: '2.5em' }} />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="display name"
              type="name"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="email"
              type="email"
              required
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
            {hasErr && <Typography color="error">{hasErr}!!</Typography>}
          </CardContent>
          <CardActions>
            <Button type="submit" fullWidth color="primary" variant="contained">
              Signup
            </Button>
          </CardActions>
          <Typography
            variant="body1"
            align="center"
            onClick={() => setIsLogin(true)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Have account? Goto Login
          </Typography>
          <div style={{ marginBottom: '2em' }} />
        </Card>
      </form>
    </Grid>
  );
};

export default Signup;
