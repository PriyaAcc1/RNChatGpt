import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import store from './src/store';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/screens/Login';
import RegistrationScreen from './src/screens/UserRegistration';
import CreateChallengeScreen from './src/screens/CreateChallenge';
import ViewChallengesScreen from './src/screens/ViewChallenges';
import ChallengeDetailScreen from './src/screens/ChallengeDetail';
import LeaderboardScreen from './src/screens/Leaderboard';

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Registration: {screen: RegistrationScreen},
  CreateChallenge: {screen: CreateChallengeScreen},
  ViewChallenges: {screen: ViewChallengesScreen},
  ChallengeDetail: {screen: ChallengeDetailScreen},
  Leaderboard: {screen: LeaderboardScreen},
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
