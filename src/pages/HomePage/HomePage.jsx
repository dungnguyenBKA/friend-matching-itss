import Header from "../../Header";
import TinderCards from "../../components/TinderCards/TinderCards";
import React from "react";
import {genFriend} from "../../fakedata";

export default function HomePage() {
  return <div>
    <Header/>
    <TinderCards
      people={genFriend()}/>
  </div>
}
