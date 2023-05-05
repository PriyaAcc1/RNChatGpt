import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const ChallengeCard = ({challenge, onJoin, navigation}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('ChallengeDetail', {challenge})}>
      <Image source={{uri: challenge.image}} style={styles.cardImage} />
      <View style={styles.cardDetails}>
        <Text style={styles.cardName}>{challenge.name}</Text>
        <Text numberOfLines={3} style={styles.cardDescription}>
          {challenge.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ViewChallengeScreen = ({navigation}) => {
  const challenges = useSelector(state => state.challenges);
  console.log('data', challenges);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}>
      {challenges.map(challenge => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

ViewChallengeScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'View Challenges',
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.navigate('CreateChallenge')}>
      <Text>Create Challenge</Text>
    </TouchableOpacity>
  ),
});

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
  scrollStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
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
