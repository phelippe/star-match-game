import React, { useState } from 'react';
import './App.css';
import utils from '../hoc/utils';
import PlayNumber from '../components/PlayNumber';
import StarsDisplay from '../components/StarsDisplay';

function App() {
  const [stars, setStars] = useState(utils.random(1, 9));
  // candidateNums
  // availableNums

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          <StarsDisplay count={stars} />
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
              <PlayNumber key={number} number={number} />
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
