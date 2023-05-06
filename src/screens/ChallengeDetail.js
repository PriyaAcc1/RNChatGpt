import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import HealthKit from 'rn-apple-healthkit';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

const authOptions = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
  ],
};

const ChallengeDetailsScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHealthProvider, setSelectedHealthProvider] =
    useState('googleFit');
  const [userData, setUserData] = useState(null);
  const challenges = useSelector(state => state.challenges);
  const dispatch = useDispatch();

  const {name, image, description, joined, id} =
    navigation.state.params.challenge;

  const [challengeJoin, setChallengeJoin] = useState(joined);

  useEffect(() => {
    if (joined) {
      Platform.OS === 'android'
        ? checkPermissionsAndroid()
        : checkPermissionsIos();
    }
  });

  const checkPermissionsIos = () => {
    HealthKit.initHealthKit(
      {
        permissions: {
          read: ['StepCount'],
        },
      },
      (err, results) => {
        if (err) {
          console.warn(err);
        } else {
          console.log('HealthKit initialized');
        }
      },
    );
    const options = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      sampleType: 'StepCount',
      unit: 'count',
      ascending: false,
      limit: 1,
    };

    HealthKit.getSamples(options, (err, results) => {
      if (err) {
        console.warn(err);
      } else {
        const count = results[0].quantity;
        console.log(`Step count for today: ${count}`);
      }
    });
  };

  const checkPermissionsAndroid = async () => {
    GoogleFit.authorize(authOptions)
      .then(data => {
        const options = {
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
          ],
          startDate: moment().startOf('day').format(),
          endDate: new Date().toISOString(),
        };
        GoogleFit.getDailyStepCountSamples(options)
          .then(res => {
            const p = res.filter(
              item => item.source === 'com.google.android.gms:estimated_steps',
            );
            // const dataSet = {};
            // const userDates = p[0].steps.map(item => item.date);
            // for (let i = 6; i >= 0; i--) {
            //   const date = moment().subtract(i, 'days').format('YYYY-MM-DD');
            //   const dateLabel = moment().subtract(i, 'days').format('ddd');
            //   userDates.indexOf(date) !== -1
            //     ? (dataSet[dateLabel] = p[0].steps.filter(
            //         item => item.date === date,
            //       )[0].value)
            //     : (dataSet[dateLabel] = 0);
            // }
            // setUserData(dataSet);
            setUserData(p[0].steps);
            console.log('google fit data', p[0].steps);
          })
          .catch(err => {
            console.log('Error fetching daily step count:', err);
          });
      })
      .catch(err => console.log('Auth err', err));
  };

  const handleConfirmSelection = () => {
    const updatedChallenges = challenges.map(challenge => {
      if (challenge.id === id) {
        challenge.healthProvider = selectedHealthProvider;
        challenge.joined = true;
      }
      return challenge;
    });
    setChallengeJoin(true);
    Platform.OS === 'android'
      ? checkPermissionsAndroid()
      : checkPermissionsIos();
    dispatch({
      type: 'UPDATE_CHALLENGES',
      payload: {
        challenges: updatedChallenges,
      },
    });
    setModalVisible(false);
  };

  const handleJoinChallenge = async () => {
    if (joined) {
      navigation.navigate('Leaderboard', {userData});
      return;
    }
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.challengeName}>{name}</Text>
      <Text style={styles.challengeDescription}>{description}</Text>
      {userData && (
        <Text style={styles.challengeDescription}>
          Today's Step Count - {userData[0].value} steps
        </Text>
      )}
      <TouchableOpacity
        style={[styles.joinButton, challengeJoin && styles.joinedButton]}
        onPress={handleJoinChallenge}>
        <Text style={styles.joinButtonText}>
          {challengeJoin ? 'Go to LeaderBoard' : 'Join Challenge'}
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text>Select Health Provider</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => setSelectedHealthProvider('googleFit')}
                style={
                  selectedHealthProvider === 'googleFit'
                    ? styles.selectedButton
                    : styles.button
                }>
                <Text style={styles.text}>Google Fit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedHealthProvider('appleHealth')}
                style={
                  selectedHealthProvider === 'appleHealth'
                    ? styles.selectedButton
                    : styles.button
                }>
                <Text style={styles.text}>Apple Health</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.actionText}
                onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirmSelection}>
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  actionText: {
    paddingHorizontal: 10,
  },
  bottomContainer: {
    marginTop: 18,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 300,
  },
  buttonContainer: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 200,
  },
  button: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    backgroundColor: '#F0ECEB',
  },
  selectedButton: {
    backgroundColor: '#2265BB',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  image: {
    width: '100%',
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default ChallengeDetailsScreen;
