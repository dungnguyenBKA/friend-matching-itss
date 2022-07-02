import React, {useEffect, useState} from "react";
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import {genFriend} from "./fakedata";

function TinderCards() {
  const [people, setPeople] = useState(genFriend());

  useEffect(() => {
    // const unsubscribe = database
    //   .collection("people")
    //   .onSnapshot((snapshot) =>
    //     setPeople(prev => {
    //       const res = snapshot.docs.map((doc) => doc.data())
    //       console.log({res})
    //       return res
    //     })
    //   );
    //
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            onCardLeftScreen={() => {
              setPeople(people.filter(item => {
                return item.name !== person.name
              }))
            }}
            className="swipe"
            key={person.name}
            preventSwipe={["up", "down"]}
          >
            <div
              style={{backgroundImage: `url(${person.url})`}}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

export default TinderCards;
