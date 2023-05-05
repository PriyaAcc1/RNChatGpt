import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ChallengeDetailsScreen = () => {
  const [joined, setJoined] = useState(false);

  const handleJoinChallenge = () => {
    setJoined(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/challenge-image.jpg' }}
        style={styles.image}
      />
      <Text style={styles.challengeName}>Challenge Name</Text>
      <Text style={styles.challengeDescription}>Challenge Description</Text>
      <TouchableOpacity
        style={[styles.joinButton, joined && styles.joinedButton]}
        onPress={handleJoinChallenge}
        disabled={joined}
      >
        <Text style={styles.joinButtonText}>
          {joined ? 'Joined' : 'Join Challenge'}
        </Text>
      </TouchableOpacity>
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
