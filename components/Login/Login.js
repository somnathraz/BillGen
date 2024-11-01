import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';
import {CountryPicker} from 'react-native-country-codes-picker';
import Theme from '../../Theme/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import GoogleIcon from './icon/GoogleIcon';
import FacebookIcon from './icon/FacebookIcon';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {
  confirmCode,
  signInWithPhoneNumber,
} from '../../config/Firebase/PhoneAuth';

const {width, height} = Dimensions.get('window');
const Login = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  const handlePress = () => {
    navigation.navigate('PhoneLogin');
  };
  // Handle login state change
  function onAuthStateChanged(user) {
    if (user) {
      setIsLoggedIn(true);
      Alert.alert('Success', 'You have logged in successfully!');
    } else {
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'right', 'left']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Video
        source={require('../../assets/Login/login.mp4')}
        style={styles.video}
        controls={false}
        resizeMode="cover"
        autoplay={true}
        repeat={true}
        muted={true}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <LinearGradient
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 0.97}}
            colors={['#FFFFFF00', '#0C1C2C']}>
            <View style={styles.welcomeWrapper}></View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>
                Let's upgrade your business management experience
              </Text>
              <Text style={styles.desc}>
                Changing the way people manage their business. Providing
                interactive and intelligent solution for all business
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.body}>
          {!confirm && !isLoggedIn && (
            <View style={styles.upperBody}>
              <View style={styles.phnWrapper}>
                <View style={styles.phoneInputContainer}>
                  <Pressable
                    onPress={() => setPickerVisible(true)}
                    style={styles.codeContainer}>
                    <Text style={styles.codeText}>{countryCode}</Text>
                  </Pressable>
                  <TextInput
                    style={styles.phoneInput}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                  <CountryPicker
                    show={isPickerVisible}
                    style={{
                      // Styles for whole modal [View]
                      modal: {
                        height: (height * 50) / 100,
                        backgroundColor: 'red',
                      },
                    }}
                    onBackdropPress={() => setPickerVisible(false)}
                    pickerButtonOnPress={item => {
                      setCountryCode(item.dial_code);
                      setPickerVisible(false);
                    }}
                  />
                </View>
                <Pressable
                  style={styles.loginBtn}
                  onPress={signInWithPhoneNumber}>
                  <Text style={styles.btnText}>Login in with Mobile</Text>
                </Pressable>
              </View>
              <View style={styles.lineWrap}>
                <View style={styles.line} />
                <Text style={styles.lineText}>or login with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.btnWrapper}>
                <Pressable style={styles.outBtn}>
                  <GoogleIcon />
                  <Text style={styles.outBtnText}>Google</Text>
                </Pressable>
                <Pressable style={styles.outBtn}>
                  <FacebookIcon />
                  <Text style={styles.outBtnText}>Facebook</Text>
                </Pressable>
              </View>
            </View>
          )}
          <View style={styles.container}>
            {confirm && (
              <View style={styles.upperBody}>
                <Text style={styles.label}>Enter OTP Code:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="123456"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                />
                <Pressable style={styles.loginBtn} onPress={confirmCode}>
                  <Text style={styles.btnText}>Login in with Mobile</Text>
                </Pressable>
              </View>
            )}
          </View>

          <View style={styles.lowerBody}>
            <Text style={styles.privacyText}>
              by continuing, you agree to our{' '}
              <TouchableOpacity style={{width: '100%'}}>
                <Text style={styles.lineText}>
                  Privacy Policy and Terms of Service
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4C5864',
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: (height * 2) / 100,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', // Ensure video covers the whole background
    zIndex: -1, // Send video to background
    elevation: -1, // Add elevation for Android layering
  },
  header: {
    flex: 0.58,
  },
  welcomeText: {
    fontSize: (width * 3) / 100,
    fontWeight: Platform.OS === 'ios' ? '600' : 'normal',
    color: '#000',
    fontFamily: Theme.fonts.semiBold.fontFamily,
  },
  heading: {
    alignItems: 'flex-start',
    gap: (width * 5) / 100,
    paddingHorizontal: (height * 2) / 100,
    paddingBottom: (width * 4) / 100,
  },
  welcomeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingText: {
    fontSize: (width * 6) / 100,
    fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
    fontFamily: Theme.fonts.bold.fontFamily,
    color: Theme.colors.white,
  },
  desc: {
    color: Theme.colors.white,
    fontSize: (width * 3) / 100,
    fontWeight: Platform.OS === 'ios' ? '300' : 'normal',
  },
  body: {
    flex: 0.42,
    backgroundColor: Theme.colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: (height * 3) / 100,
    paddingHorizontal: (height * 2) / 100,
  },
  phnWrapper: {
    flexDirection: 'column',
    gap: 10,
  },
  upperBody: {
    flex: 0.55,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  lowerBody: {
    alignItems: 'center',
  },
  privacyText: {
    textAlign: 'center',
  },
  loginBtn: {
    backgroundColor: '#C0E863',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height * 1.5) / 100,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },

  phoneInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  btnText: {
    color: Theme.colors.black,
    fontFamily: Theme.fonts.semiBold.fontFamily,
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
  },
  lineWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: (width * 2) / 100,
  },
  lineText: {
    color: Theme.colors.black,

    fontFamily: Theme.fonts.regular.fontFamily,
  },
  line: {
    flex: 0.58,
    width: (width * 10) / 100,
    height: (width * 0.2) / 100,
    backgroundColor: Theme.colors.lightBorderColor,
  },
  btnWrapper: {
    flexDirection: 'row',
    gap: (width * 5) / 100,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  outBtn: {
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: (width * 2) / 100,
    paddingVertical: (width * 2.9) / 100,
    paddingHorizontal: (width * 10) / 100,
    borderColor: Theme.colors.lightBorderColor,
  },
  outBtnText: {
    color: Theme.colors.black,
    fontFamily: Theme.fonts.regular.fontFamily,
  },
});
