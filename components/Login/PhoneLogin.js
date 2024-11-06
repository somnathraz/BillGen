import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PhoneLogin = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
      <View>
        <Text>Phone login</Text>
      </View>
    </SafeAreaView>
  );
};

export default PhoneLogin;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4C5864',
  },
});
