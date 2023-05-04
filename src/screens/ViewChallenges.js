import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ChallengeCard = ({ challenge, onJoin }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onJoin}>
      <Image source={{ uri: challenge.image }} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardName}>{challenge.name}</Text>
        <Text style={styles.cardDescription}>{challenge.description}</Text>
        <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const ViewChallengeScreen = () => {
  const challenges = [
    {
      id: '1',
      name: 'Challenge 1',
      description: 'This is the description of Challenge 1.',
      image: 'https://picsum.photos/300/200?random=1',
    },
    {
      id: '2',
      name: 'Challenge 2',
      description: 'This is the description of Challenge 2.',
      image: 'https://picsum.photos/300/200?random=2',
    },
    {
      id: '3',
      name: 'Challenge 3',
      description: 'This is the description of Challenge 3.',
      image: 'https://picsum.photos/300/200?random=3',
    },
  ];

  const handleJoinChallenge = (challengeId) => {
    // Handle joining a challenge
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>View Challenges</Text>
      <View style={styles.cardsContainer}>
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onJoin={() => handleJoinChallenge(challenge.id)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardDetails: {
    padding: 8,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  joinButton: {
    backgroundColor: '#2a9df4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ViewChallengeScreen;
