import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Theme from '../../Theme/Theme';
const {width, height} = Dimensions.get('window');
const Onboarding = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Manage Business Easily and Be More Organized
        </Text>
        <Text style={styles.desc}>
          Business Management has been easier, more Organized and Tidy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: (width * 5) / 100,
  },
  heading: {
    fontFamily: Theme.fonts.extraBold.fontFamily,
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
  },
  desc: {
    fontFamily: Theme.fonts.regular.fontFamily,
    color: Theme.colors.descText,
    textAlign: 'center',
  },
});
