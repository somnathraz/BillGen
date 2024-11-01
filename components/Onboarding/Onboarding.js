import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Dimensions,
  Button,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>
          Manage business easily and be more organized
        </Text>
        <Text style={styles.desc}>
          Business Management has been easier, more Organized and Tidy
        </Text>
        <Button
          title="Learn More"
          color="#841584"
          onPress={() => navigation.navigate('Login')}
          accessibilityLabel="Learn more about this purple button"
        />
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
    gap: (width * 5) / 100,
    paddingHorizontal: (width * 5) / 100,
  },
  heading: {
    paddingHorizontal: (width * 2) / 100,
    fontFamily: Theme.fonts.extraBold.fontFamily,
    fontSize: (width * 10) / 100,
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
