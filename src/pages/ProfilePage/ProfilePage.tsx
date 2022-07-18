import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import { Person, Search, Visibility, VisibilityOff } from '@material-ui/icons';
import Avatar from '../../components/Avatar';
import { getFavs, updateUser } from '../../firebase';

const ProfilePage: React.FC = () => {
  const { user, signIn } = useAuth();

  const header = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  const [tab, setTab] = useState(0);
  const [hasErr, setHasErr] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [done, setDone] = useState(false);
  const [favs, setFavs] = useState([]);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email || '');
  const [passwd, setPasswd] = useState('');
  const [newPasswd, setNewPasswd] = useState('');
  const [image, setImage] = useState(user?.image);
  const [fav, setFav] = useState(user?.fav || []);

  useEffect(() => {
    getFavs().then((favs) => {
      setFavs(favs);
    });
  }, []);

  useEffect(() => {
    const node = header.current ? (header.current as HTMLDivElement) : null;
    setHeaderHeight(node ? node.clientHeight : 0);
  }, [header]);

  useEffect(() => {
    if (done) {
      setTimeout(() => setDone(false), 2000);
    }
  }, [done]);

  const handleChangeProfile = async (e) => {
    e.preventDefault();
    if (user) {
      const res = await updateUser(user?.email, { name, email, image, fav });
      signIn(res);
      setDone(true);
    }
  };
  const handleChangePasswd = async (e) => {
    e.preventDefault();
    if (passwd !== user?.passwd) {
      setHasErr('Old password not matched');
    } else if (newPasswd === user?.passwd) {
      setHasErr('Password not changed');
    } else {
      setHasErr(null);
      const res = await updateUser(user?.email, { email, passwd: newPasswd });
      signIn(res);
      setPasswd('');
      setNewPasswd('');
      setDone(true);
    }
  };

  return (
    <>
      <div ref={header}>
        <Header backButton="/" />
      </div>
      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="center"
        style={{
          minHeight: window.innerHeight - headerHeight,
          background: '#f5f2ea',
          position: 'relative',
          padding: '2em',
        }}
      >
        <Card style={{}}>
          <Tabs
            value={tab}
            onChange={(_e, newVal) => setTab(newVal)}
            orientation="vertical"
          >
            <Tab label="Edit profile" icon={<Person />} />
            <Tab label="Change password" icon={<Search />} />
          </Tabs>
        </Card>
        <Card style={{ width: '50%' }}>
          <div hidden={tab === 1}>
            <form onSubmit={handleChangeProfile}>
              <Card style={{ minWidth: '420px' }} align-items="center">
                <CardContent>
                  {image ? <Avatar src={image} size={100} /> : <Person />}
                  <Typography variant="h4" align="center">
                    {user?.name}
                  </Typography>
                  <div style={{ margin: '2.5em' }} />
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Display name"
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="image url"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                  <div style={{ marginBottom: '1em' }} />
                  <InputLabel id="fav">Favourites</InputLabel>
                  <Select
                    multiple
                    labelId="fav"
                    value={fav}
                    onChange={(e) =>
                      setFav(
                        (e.target.value as number[]).filter((i) => i !== null)
                      )
                    }
                    input={<Input />}
                  >
                    {favs.map((f, i) => (
                      <MenuItem key={i} value={i}>
                        {f}
                      </MenuItem>
                    ))}
                  </Select>
                  {done && <Typography color="error">done!!</Typography>}
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </CardActions>
                <div style={{ marginBottom: '2em' }} />
              </Card>
            </form>
          </div>
          <div hidden={tab === 0}>
            <form onSubmit={handleChangePasswd}>
              <Card style={{ minWidth: '420px' }} align-items="center">
                <CardContent>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Old password"
                    type={showPass ? 'text' : 'password'}
                    value={passwd}
                    onChange={(e) => setPasswd(e.target.value)}
                    required
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            area-label="toggle password visibility"
                            onClick={() => setShowPass(!showPass)}
                            onMouseDown={() => setShowPass(!showPass)}
                          >
                            {showPass ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="New password"
                    type={showPass ? 'text' : 'password'}
                    value={newPasswd}
                    onChange={(e) => setNewPasswd(e.target.value)}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            area-label="toggle password visibility"
                            onClick={() => setShowPass(!showPass)}
                            onMouseDown={() => setShowPass(!showPass)}
                          >
                            {showPass ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {hasErr && <Typography color="error">{hasErr}!!</Typography>}
                  {done && <Typography color="error">done!!</Typography>}
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                  >
                    Update
                  </Button>
                </CardActions>
                <div style={{ marginBottom: '2em' }} />
              </Card>
            </form>
          </div>
        </Card>
      </Grid>
    </>
  );
};

export default ProfilePage;
