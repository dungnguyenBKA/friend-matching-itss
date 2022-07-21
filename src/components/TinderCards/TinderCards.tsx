import React, { createRef, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
import { Typography } from '@material-ui/core';
import './TinderCards.css';
import SwipeButtons from '../SwipeButtons/SwipeButtons';
import UserModel from '../../models/UserModel';
import { cyrb53 } from '../../utils/utils';
import unknownAvatar from '../../assets/unknown-avatar.png';

const TinderCards = ({ people }: { people: UserModel[] }) => {
  const refs = useMemo(
    () =>
      Array(people.length)
        .fill(null)
        .map((_i) => createRef<any>()),
    [people]
  );

  const history = useHistory();

  const [curIdx, setCurIdx] = useState(people.length - 1);

  useEffect(() => {
    setCurIdx(people.length - 1);
  }, [people]);

  return (
    <div>
      <div className="tinderCards__cardContainer">
        {people.map((person, idx) => (
          <TinderCard
            className="swipe"
            key={cyrb53(person.email)}
            preventSwipe={['up', 'down']}
            ref={refs[idx]}
            onCardLeftScreen={() => setCurIdx(idx - 1)}
          >
            <div
              style={{
                backgroundImage: `url(${person.image ?? unknownAvatar})`,
              }}
              className="card"
              onDoubleClick={() => {
                history.push(`/friend/${cyrb53(person.email)}`);
              }}
            >
              <Typography variant="h5">{person.name}</Typography>
            </div>
          </TinderCard>
        ))}
      </div>

      <SwipeButtons
        onRefresh={() => {
          if (curIdx >= people.length - 1) return;
          refs[curIdx + 1].current.restoreCard();
          setCurIdx(curIdx + 1);
        }}
      />
    </div>
  );
};

export default TinderCards;
