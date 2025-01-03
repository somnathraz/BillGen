import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Theme from '../../Theme/Theme';
const {width} = Dimensions.get('window');

const Progress = ({value}) => {
  return (
    <ProgressBar
      progress={value}
      color={Theme.colors.pastelGreen}
      style={styles.pb}
    />
  );
};
const styles = StyleSheet.create({
  pb: {
    // width: (width * 90) / 100,
    height: 9,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 4,
  },
});
export default Progress;
