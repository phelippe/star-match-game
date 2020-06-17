import React, { useState, useEffect } from 'react';

import utils from '../hoc/utils';
import PlayNumber from '../components/PlayNumber';
import StarsDisplay from '../components/StarsDisplay';
import PlayAgain from '../components/PlayAgain';

const StarMatch = (props) => {
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNums.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000);

            return () => clearTimeout(timerId);
        }
    });

    const candidadtesAreWrong = utils.sum(candidateNums) > stars;
    // const gameIsWon = availableNums.length === 0;
    // const gameIsLost = secondsLeft === 0;
    const gameStatus = availableNums.length === 0
        ? 'won'
        : secondsLeft === 0 ? 'lost' : 'active';

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
    };

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
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }

        const newCandidateNumbers =
            currentStatus === 'available'
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);

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
                    {
                        gameStatus !== 'active' ? (
                            //play again loginc
                            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                        ) : (
                                <StarsDisplay count={stars} />
                            )
                    }

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
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

export default StarMatch;