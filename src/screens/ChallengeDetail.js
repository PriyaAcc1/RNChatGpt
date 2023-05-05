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
import {GoogleFit} from 'react-native-google-fit';

const options = {
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  bucketUnit: 'DAY',
  bucketInterval: 1,
};

const ChallengeDetailsScreen = () => {
  const [joined, setJoined] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHealthProvider, setSelectedHealthProvider] = useState(null);
  const [isGoogleFitSelected, setIsGoogleFitSelected] = useState(false);

  const checkPermissions = async () => {
    const permissions = await GoogleFit.checkIsAuthorized([
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.body.read',
    ]);

    if (
      permissions.includes('Denied') ||
      permissions.includes('NotDetermined')
    ) {
      const newPermissions = await GoogleFit.requestPermissions([
        'https://www.googleapis.com/auth/fitness.activity.read',
        'https://www.googleapis.com/auth/fitness.body.read',
      ]);

      if (newPermissions.includes('Denied')) {
        console.log('Permission denied by user.');
      } else {
        console.log('Permission granted.');
      }
    } else {
      console.log('App already has necessary permissions.');
    }
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

  const handleJoinChallenge = () => {
    // setJoined(true);
    // setModalVisible(true);
    checkPermissions()
      .then(() => {
        GoogleFit.getDailyStepCountSamples(options)
          .then(res => {
            console.log('Daily step count:', res);
          })
          .catch(err => {
            console.log('Error fetching daily step count:', err);
          });
      })
      .catch((err) => console.log('error',err));
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
        onPress={handleJoinChallenge}
        disabled={joined}>
        <Text style={styles.joinButtonText}>
          {joined ? 'Joined' : 'Join Challenge'}
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
