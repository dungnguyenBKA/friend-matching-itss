import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import Header from '../../components/Header';
import { addBookmark, getFavs, getUser, removeBookmark } from '../../firebase';
import useAuth from '../../hooks/useAuth';
import UserModel from '../../models/UserModel';
import { cyrb53 } from '../../utils/utils';

const FriendDetailPage = () => {
  const { user: curUser, signIn } = useAuth();

  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserModel | undefined>(undefined);

  const [favs, setFavs] = useState([]);
  const [bookmarked, setBookmarked] = useState(false);
  const [hasErr, setErr] = useState<string | null>(null);

  useEffect(() => {
    getFavs().then((favs) => {
      setFavs(favs);
    });
  }, []);

  useEffect(() => {
    getUser(id).then((u) => setUser(u));
  }, [id]);

  useEffect(() => {
    if (hasErr) {
      setTimeout(() => setErr(null), 2000);
    }
  }, [hasErr]);

  useEffect(() => {
    if (user === null) history.replace('/');
    else {
      if ((curUser?.bookmarks || []).includes(id)) {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    }
  }, [user, curUser, id, history]);

  const handleBookmark = () => {
    if (bookmarked) {
      removeBookmark(cyrb53(curUser?.email || ''), id).then((newUser) => {
        if (newUser) {
          signIn(newUser);
          setBookmarked(!bookmarked);
        }
      });
    } else {
      addBookmark(cyrb53(curUser?.email || ''), id).then((newUser) => {
        if (newUser === false) {
          setErr('You have been blocked by admin');
        } else if (newUser === true) {
          setErr('This user has been blocked by admin');
        } else if (newUser) {
          signIn(newUser);
          setBookmarked(!bookmarked);
        }
      });
    }
  };

  return (
    <div>
      <Header backButton="/" />
      <div style={{ marginBottom: '3em' }} />
      {user && (
        <Grid container spacing={0} direction="row" justifyContent="center">
          <Card style={{ minWidth: '420px' }} align-items="center">
            <CardContent>
              <Avatar src={user.image} size={100} />
              <Typography variant="h4" align="center">
                {user?.name}
              </Typography>
              <div style={{ margin: '2.5em' }} />
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="About"
                type="text"
                value={user?.about || 'nothing here'}
                disabled={!user?.about}
                multiline
                contentEditable={false}
              />
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="Favourites"
                type="text"
                value={
                  favs.filter((_e, i) => user?.fav?.includes(i)).join(', ') ||
                  'none'
                }
                disabled={!user?.fav}
                contentEditable={false}
              />
              <div style={{ marginBottom: '1em' }} />
              {hasErr && <Typography color="error">{hasErr}!!</Typography>}
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                fullWidth
                color={bookmarked ? 'secondary' : 'primary'}
                variant="contained"
                onClick={handleBookmark}
              >
                {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
              </Button>
            </CardActions>
            <div style={{ marginBottom: '2em' }} />
          </Card>
        </Grid>
      )}
    </div>
  );
};

export default FriendDetailPage;
