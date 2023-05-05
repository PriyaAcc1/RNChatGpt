import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Switch,
  Button,
} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import moment from 'moment';

const authOptions = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};

const ChallengeDetailsScreen = ({navigation}) => {
  const [joined, setJoined] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHealthProvider, setSelectedHealthProvider] = useState(null);
  const [isGoogleFitSelected, setIsGoogleFitSelected] = useState(false);
  const [userData, setUserData] = useState([]);

  const checkPermissions = async () => {
    GoogleFit.authorize(authOptions)
      .then(data => {
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
          ],
          startDate: moment(moment().subtract(7, 'days'))
            .startOf('day')
            .format(),
          endDate: new Date().toISOString(),
        };
        GoogleFit.getDailyStepCountSamples(options)
          .then(res => {
            const p = res.filter(
              item => item.source === 'com.google.android.gms:estimated_steps',
            );
            const dataSet = {};
            const userDates = p[0].steps.map(item => item.date);
            for (let i = 6; i >= 0; i--) {
              const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
              const dateLabel = moment().subtract(i, 'days').format('ddd');
              userDates.indexOf(date) !== -1
                ? (dataSet[dateLabel] = p[0].steps.filter(
                    item => item.date === date,
                  )[0].value)
                : (dataSet[dateLabel] = 0);
            }
            setUserData(dataSet);
          })
          .catch(err => {
            console.log('Error fetching daily step count:', err);
          });
      })
      .catch(err => console.log('Auth err', err));
  };

  const handleToggleSwitch = () => {
    setIsGoogleFitSelected(!isGoogleFitSelected);
  };

  const handleConfirmSelection = () => {
    setModalVisible(false);
    setSelectedHealthProvider(
      isGoogleFitSelected ? 'Google Fit' : 'Apple Health',
    );
  };

  const handleJoinChallenge = async () => {
    if (joined) {
      navigation.navigate('Leaderboard', {userData});
      return;
    }
    setJoined(true);
    setModalVisible(true);
    checkPermissions();
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://example.com/challenge-image.jpg'}}
        style={styles.image}
      />
      <Text style={styles.challengeName}>Challenge Name</Text>
      <Text style={styles.challengeDescription}>Challenge Description</Text>
      <TouchableOpacity
        style={[styles.joinButton, joined && styles.joinedButton]}
        onPress={handleJoinChallenge}>
        <Text style={styles.joinButtonText}>
          {joined ? 'Go to LeaderBoard' : 'Join Challenge'}
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View>
          <Text>Select Health Provider:</Text>
          <Switch
            value={isGoogleFitSelected}
            onValueChange={handleToggleSwitch}
          />
          <Text>{isGoogleFitSelected ? 'Google Fit' : 'Apple Health'}</Text>
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
          <Button
            title="OK"
            onPress={handleConfirmSelection}
            disabled={!selectedHealthProvider}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  challengeName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  challengeDescription: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  joinedButton: {
    backgroundColor: 'gray',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ChallengeDetailsScreen;
