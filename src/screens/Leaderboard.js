// import React from 'react';
// import {View, StyleSheet, Dimensions} from 'react-native';
// import {BarChart} from 'react-native-chart-kit';

// const screenWidth = Dimensions.get('window').width;
// const chartWidth = screenWidth - 20;

// const WeeklyDataChart = ({navigation}) => {
//   const {userData = {}} = navigation.state.params;
//   const chartData = {
//     labels: Object.keys(userData),
//     datasets: [
//       {
//         data: Object.values(userData),
//         color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // set the color of the bar chart
//       },
//     ],
//   };
//   console.log('leaderboard', userData);
//   return (
//     <View style={styles.container}>
//       <BarChart
//         data={chartData}
//         width={chartWidth}
//         height={200}
//         chartConfig={{
//           backgroundColor: '#fff',
//           backgroundGradientFrom: '#fff',
//           backgroundGradientTo: '#fff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//   },
// });

// export default WeeklyDataChart;

import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Animated} from 'react-native';

const leaderboardData = [
  {id: 1, name: 'John Doe', score: 100},
  {id: 2, name: 'Jane Doe', score: 90},
  {id: 3, name: 'Bob Smith', score: 80},
  {id: 4, name: 'Alice Johnson', score: 70},
  {id: 5, name: 'Chris Lee', score: 60},
  {id: 6, name: 'Emma Watson', score: 50},
  {id: 7, name: 'David Beckham', score: 40},
];

const Leaderboard = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderItem = ({item, index}) => {
    let rankingColor = '#000000';
    if (index === 0) {
      rankingColor = '#FFD700';
    } else if (index === 1) {
      rankingColor = '#C0C0C0';
    } else if (index === 2) {
      rankingColor = '#cd7f32';
    }

    return (
      <View style={styles.itemContainer}>
        <Animated.Text style={[styles.ranking, {opacity: fadeAnim}]}>
          {index + 1}
        </Animated.Text>
        <Animated.Text style={[styles.name, {opacity: fadeAnim}]}>
          {item.name}
        </Animated.Text>
        <Animated.Text style={[styles.score, {opacity: fadeAnim}]}>
          {item.score}
        </Animated.Text>
        <Animated.View
          style={[
            styles.rankingIndicator,
            {backgroundColor: rankingColor, opacity: fadeAnim},
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ranking: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  name: {
    flex: 3,
    fontSize: 18,
    color: '#000000',
    marginRight: 10,
  },
  score: {
    flex: 1,
    fontSize: 18,
    color: '#000000',
    marginRight: 10,
  },
  rankingIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default Leaderboard;
