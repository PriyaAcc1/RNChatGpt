import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
  counter: 10,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
