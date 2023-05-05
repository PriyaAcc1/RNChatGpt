import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 20;

const WeeklyDataChart = ({navigation}) => {
  const {userData = {}} = navigation.state.params;
  const chartData = {
    labels: Object.keys(userData),
    datasets: [
      {
        data: Object.values(userData),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // set the color of the bar chart
      },
    ],
  };
  console.log('leaderboard', userData);
  return (
    <View style={styles.container}>
      <BarChart
        data={chartData}
        width={chartWidth}
        height={200}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default WeeklyDataChart;
