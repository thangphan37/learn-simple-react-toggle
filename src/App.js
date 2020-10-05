import React from 'react';
import Switch from './switch';

const actionTypes = {
  TOGGLE: 'TOGGLE',
  ON: 'ON',
  OFF: 'off'
};

function toggleReducer(state, action) {
  switch (action.type) {
    case actionTypes.TOGGLE: {
      return {...state, on: !state.on};
    }

    case actionTypes.ON: {
      return {on: true}
    }

    case actionTypes.OFF: {
      return {on: false}
    }

    default:
      throw new Error(`Unhandled toggleReducer with: ${action.type}`);
  }
}

function useToggle({reducer = toggleReducer} = {}) {
  const [{on}, dispatch] = React.useReducer(reducer, {on:false});
  //destructuring: on = false;
  const toggle = () => dispatch({type: actionTypes.TOGGLE});
  const setOn = () => dispatch({type: actionTypes.ON});
  const setOff = () => dispatch({type: actionTypes.OFF});

  return {on, toggle, setOn, setOff};
}

function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0);
  const tooManyClicks = clicksSinceReset >= 4;
  const {on, toggle, setOn, setOff} = useToggle({
    //reducer: function reducer() {}
    reducer(state, action) {
      const changes = toggleReducer(state, action);

      if(tooManyClicks && action.type === actionTypes.TOGGLE) {
        return {...changes, on: state.on};
      } else {
        return changes;
      }
    }
  });

  return (
    <div>
      <button onClick={setOff}>SetOff</button>
      <button onClick={setOn}>SetOn</button>
      <Switch on={on} onClick={() => {
        toggle();
        setClicksSinceReset(count => count + 1);
      }}/>
      {
        tooManyClicks ? <button onClick={() => setClicksSinceReset(0)}>Reset</button> : null
      }
    </div>
  )
}
function App() {
  return <Toggle />;
}

export default App;
