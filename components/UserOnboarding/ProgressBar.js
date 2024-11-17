import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Theme from '../../Theme/Theme';
const {width, height} = Dimensions.get('window');

const Progress = ({value}) => {
  return (
    <View style={styles.container}>
      <ProgressBar
        progress={value}
        color={Theme.colors.primary}
        style={styles.pb}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    width: (width * 70) / 100,
  },
  pb: {
    width: (width * 66) / 100,
    height: 9,
    backgroundColor: Theme.colors.lightSecondary,
    borderRadius: 4,
  },
});
export default Progress;
