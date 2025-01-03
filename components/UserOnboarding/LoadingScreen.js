import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, StatusBar, Dimensions, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Theme from '../../Theme/Theme';
import Progress from './ProgressBar';
import {useUserData} from '../../context/UserContext';

const {width} = Dimensions.get('window');

const LoadingScreen = () => {
  const navigation = useNavigation();
  const [slider, setSlider] = useState(0);
  const {userData} = useUserData();

  useEffect(() => {
    const timerPromise = new Promise(resolve => {
      const endTime = Date.now() + 4500;
      const timer = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, endTime - now);
        const progress = 1 - timeLeft / 3000;
        setSlider(progress);

        if (now >= endTime) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
    // Define the API call as a promise

    const fetchUserData = async () => {
      console.log(userData, 'from loading screens');

      const response = await fetch(
        'http://192.168.31.180:8000/business-profiles/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business_name: userData.businessName,
            business_industry: userData.businessIndustry,
            business_type: userData.businessType,
            business_phone: userData?.phoneNumber,
            business_email: userData.business_email,
          }),
        },
      );
      const result = await response.json();
      // console.log(result, 'result from backends');
      return result;
    };

    Promise.all([timerPromise, fetchUserData()])
      .then(([_, userDataResponse]) => {
        console.log('User data sent and timer finished:', userDataResponse);
        navigation.reset({index: 0, routes: [{name: 'Home'}]}); // Navigate to Main Screen
        // AsyncStorage.setItem('userProfileStatus', 'true');
      })
      .catch(error => {
        console.error('Error in processing:', error);
        navigation.reset({index: 0, routes: [{name: 'Home'}]}); // Optionally handle errors differently
      });
  }, [navigation, userData]);

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
            <Text style={styles.text}>
              Transforming numbers into success, just a moment
            </Text>
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
    justifyContent: 'center',
  },
  text: {
    color: Theme.colors.black,
    fontSize: (width * 4) / 100,
    fontFamily: Theme.fonts.semiBold.fontFamily,
    textAlign: 'center',
  },
});
