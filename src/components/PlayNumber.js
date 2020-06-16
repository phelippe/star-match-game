import React from 'react';

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };

  
const PlayNumber = (props) => {
    return (
        <button
            className="number"
            style={{ backgroundColor: colors[props.status] }}
            onClick={() => console.log('Num: ', props.number)}
        >{props.number}</button>
    );
};

export default PlayNumber;