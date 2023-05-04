import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './src/screens/Login';
import RegistrationScreen from './src/screens/UserRegistration';
// import CreateChallengeScreen from './screens/CreateChallengeScreen';
// import ViewChallengesScreen from './screens/ViewChallengesScreen';
// import LeaderboardScreen from './screens/LeaderboardScreen';

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Registration: {screen: RegistrationScreen},
  // CreateChallenge: { screen: CreateChallengeScreen },
  // ViewChallenges: { screen: ViewChallengesScreen },
  // Leaderboard: { screen: LeaderboardScreen },
});

const AppContainer = createAppContainer(AppNavigator);

AppRegistry.registerComponent(appName, () => AppContainer);
