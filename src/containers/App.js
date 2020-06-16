import React, { useState } from 'react';
import './App.css';
import utils from '../hoc/utils';
import PlayNumber from '../components/PlayNumber';
import StarsDisplay from '../components/StarsDisplay';

function App() {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const candidadtesAreWrong = utils.sum(candidateNums) > stars;

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidadtesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used') {
      return;
    }

    const newCandidateNumbers = 
      currentStatus === 'available'
      ? candidateNums.concat(number)
      : candidateNums.filter(cn => cn !==number);
    
    if (utils.sum(newCandidateNumbers) !== stars) {
      setCandidateNums(newCandidateNumbers);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNumbers.includes(n)
      );
      //redraw stars (from what's available)
      setStars(utils.randomSumIn(newAvailableNums, 9));

      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

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
            <PlayNumber
              key={number}
              number={number}
              status={numberStatus(number)}
              onClick={onNumberClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
