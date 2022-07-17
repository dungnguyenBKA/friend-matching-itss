import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {database} from "./firebase";
import {get, ref} from "firebase/database";
import HomePage from "./pages/HomePage/HomePage";
import ChatListPage from "./pages/ChatListPage/ChatListPage";
import ChatDetailPage from "./pages/ChatDetailPage/ChatDetailPage";
import {wrapWithLoginRequire} from "./components/RequireLogin/RequireLogin";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  async function getData() {
    try {
      const rootRef = ref(database)
      const res = await get(rootRef)
      console.log('root', res.val())
    } catch (e) {
      console.error(e)
    } finally {

    }
  }

  useEffect(() => {
    getData().finally(() => {

    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/chat/:person">
            {wrapWithLoginRequire(<ChatDetailPage/>)}
          </Route>
          <Route path="/chat">
            {wrapWithLoginRequire(<ChatListPage/>)}
          </Route>
          <Route path="/profile">
            {wrapWithLoginRequire(<ProfilePage/>)}
          </Route>
          <Route path="/">
            {wrapWithLoginRequire(<HomePage/>)}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
