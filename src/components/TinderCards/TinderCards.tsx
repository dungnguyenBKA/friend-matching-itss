import React from 'react';
import TinderCard from 'react-tinder-card';
import './TinderCards.css';
import SwipeButtons from "../SwipeButtons/SwipeButtons";

interface TinderCardsProps {
  people: any[]
}

const TinderCards: React.FC<TinderCardsProps> = (props) => {
  const {people} = props

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}>
            <div
              style={{backgroundImage: `url(${person.url})`}}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>

      <SwipeButtons
        onRefresh={() => {
          // refresh page
        }}/>
    </div>
  );
}

export default TinderCards;
