import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import CreateChallengeScreen from './screens/CreateChallengeScreen';
import ViewChallengesScreen from './screens/ViewChallengesScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const AppNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Registration: { screen: RegistrationScreen },
  CreateChallenge: { screen: CreateChallengeScreen },
  ViewChallenges: { screen: ViewChallengesScreen },
  Leaderboard: { screen: LeaderboardScreen },
});

export default createAppContainer(AppNavigator);
