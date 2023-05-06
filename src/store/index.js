import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const initialState = {
  users: {
    admin: '123',
  },
  challenges: [
    {
      id: '1',
      joined: false,
      name: 'Challenge 1',
      description: 'This is the description of Challenge 1.',
      image: 'https://picsum.photos/300/200?random=1',
    },
    {
      id: '2',
      name: 'Challenge 2',
      joined: false,
      description: 'This is the description of Challenge 2.',
      image: 'https://picsum.photos/300/200?random=2',
    },
    {
      id: '3',
      name: 'Challenge 3',
      joined: true,
      healthProvider: 'googleFit',
      description: 'This is the description of Challenge 3.',
      image: 'https://picsum.photos/300/200?random=3',
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CHALLENGES':
      return {
        ...state,
        challenges: action.payload.challenges,
      };
    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload.challenge],
      };
    case 'ADD_USER':
      return {
        ...state,
        users: {
          ...state.users,
          [action.payload.username]: action.payload.password,
        },
      };
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
