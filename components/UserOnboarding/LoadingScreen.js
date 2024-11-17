import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, StatusBar, Dimensions, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Theme from '../../Theme/Theme';
import Progress from './ProgressBar';

const {width, height} = Dimensions.get('window');

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [slider, setSlider] = useState(0);

  useEffect(() => {
    const timerPromise = new Promise(resolve => {
      const endTime = Date.now() + 5000; // Change to 5 seconds
      const timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, endTime - now);
        const progress = 1 - timeLeft / 5000; // Change to 5 seconds
        setSlider(progress);

        if (now >= endTime) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });

    timerPromise.then(() => {
      navigation.reset({index: 0, routes: [{name: 'Home'}]}); // Navigate to Main Screen
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Theme.colors.white} barStyle="dark-content" />
      <View style={styles.entireContent}>
        <LottieView
          source={require('../../assets/Onboarding/loading.json')}
          autoPlay
          loop
          style={{
            width: width * 0.4,
            height: width * 0.45,
          }}
        />
        <View style={styles.wrapper}>
          <View style={styles.contentwrapper}>
            <Text>Transforming numbers into success, just a moment</Text>
          </View>
          <Progress value={slider} />
        </View>
      </View>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  wrapper: {
    flexDirection: 'column',
    gap: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entireContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentwrapper: {
    width: width * 0.75,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
