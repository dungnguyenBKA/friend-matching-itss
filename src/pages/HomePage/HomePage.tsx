import Header from '../../components/Header';
import TinderCards from '../../components/TinderCards/TinderCards';
import React from 'react';
import { genFriend } from '../../fakedata';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header backButton="" />
      <TinderCards people={genFriend()} />
    </div>
  );
};

export default HomePage;
