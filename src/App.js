import React, {useEffect} from 'react';
import Header from './Header';
import TinderCards from './TinderCards';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SwipeButtons from './SwipeButtons';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
import {database} from "./firebase";
import {get, ref} from "firebase/database";

function App() {
  async function getData() {
    try {
      const rootRef = ref(database)
      const res = await get(rootRef)
      console.log('root',res.val())
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
      <Router>
        <Switch>
          <Route path="/chat/:person">
            <Header backButton="/chat"/>
            <ChatScreen/>
          </Route>
          <Route path="/chat">
            <Header backButton="/"/>
            <Chats/>
          </Route>
          <Route path="/">
            <Header/>
            <TinderCards/>
            <SwipeButtons/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
