import React from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

function WeeklyDataChart() {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 60],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // set the color of the bar chart
      },
    ],
  };

  return (
    <View>
      <Text>Weekly Data Chart</Text>
      <BarChart
        data={chartData}
        width={300}
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
}

export default WeeklyDataChart;
