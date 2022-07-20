import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ChatListPage from './pages/ChatListPage/ChatListPage';
import ChatDetailPage from './pages/ChatDetailPage/ChatDetailPage';
import {wrapWithLoginRequire} from './components/RequireLogin/RequireLogin';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import useAuth from "./hooks/useAuth";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  const {user} = useAuth()

  const isAdmin = user?.email === "admin@finder.com"

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {
            isAdmin ?
              <>
                <Route path="/admin">{wrapWithLoginRequire(<AdminPage/>)}</Route>
                <Route path="/">
                  <Redirect to="/admin" />
                </Route>
              </>
              :
              <>
                <Route path="/chat/:person">
                  {wrapWithLoginRequire(<ChatDetailPage/>)}
                </Route>
                <Route path="/chat">{wrapWithLoginRequire(<ChatListPage/>)}</Route>
                <Route path="/profile">{wrapWithLoginRequire(<ProfilePage/>)}</Route>
                <Route path="/">{wrapWithLoginRequire(<HomePage/>)}</Route>
                <Route path="/admin">
                  <Redirect to="/" />
                </Route>
              </>
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
