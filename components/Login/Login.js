import React, {useState} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CountryPicker} from 'react-native-country-codes-picker';
import Theme from '../../Theme/Theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import GoogleIcon from './icon/GoogleIcon';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {
  confirmCode,
  signInWithPhoneNumber,
} from '../../config/Firebase/PhoneAuth';
import {useSnackbar} from '../../context/SnackBarContext';
import {SignInWithGoogle} from '../../config/Firebase/GoogleAuth';
import ConfirmOtp from './ConfirmOtp';

const {width, height} = Dimensions.get('window');
const Login = () => {
  const {showSnackbar} = useSnackbar();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

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
            <View style={styles.welcomeWrapper} />
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
          {!confirm && (
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
                  onPress={() => {
                    signInWithPhoneNumber(
                      phoneNumber,
                      countryCode,
                      setConfirm,
                      showSnackbar,
                      setLoading,
                    );
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Send OTP</Text>
                  )}
                </Pressable>
              </View>
              <View style={styles.lineWrap}>
                <View style={styles.line} />
                <Text style={styles.lineText}>or login with</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.btnWrapper}>
                <Pressable
                  style={styles.outBtn}
                  onPress={() => SignInWithGoogle(showSnackbar, navigation)}>
                  <GoogleIcon />
                  <Text style={styles.outBtnText}>Google</Text>
                </Pressable>
              </View>
            </View>
          )}

          {confirm && (
            <View style={styles.upperBody}>
              <ConfirmOtp
                loading={loading}
                setCode={setCode}
                confirmCode={() =>
                  confirmCode(
                    code,
                    confirm,
                    navigation,
                    showSnackbar,
                    phoneNumber,
                    setLoading,
                  )
                }
              />
            </View>
          )}

          <View style={styles.lowerBody}>
            <Text style={styles.privacyText}>
              by continuing, you agree to our{' '}
              <TouchableOpacity style={styles.fullWidth}>
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
    position: 'absolute',
    width: '100%',
    bottom: -30,
    paddingBottom: (height * 5) / 100,
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
  codeContainer: {
    paddingRight: (width * 4) / 100,
    borderRightWidth: 1,
  },
  codeText: {
    color: Theme.colors.black,
    fontFamily: Theme.fonts.semiBold.fontFamily,
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
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
    // fontWeight: Platform.OS === 'ios' ? '300' : 'normal',
    fontFamily: Theme.fonts.regular.fontFamily,
    lineHeight: 20,
  },
  body: {
    flex: 0.42,
    backgroundColor: Theme.colors.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: (height * 4.5) / 100,
    paddingHorizontal: (height * 2) / 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  phnWrapper: {
    flexDirection: 'column',
    gap: 10,
  },
  upperBody: {
    flex: 0.55,
    flexDirection: 'column',

    justifyContent: 'space-between',
    gap: 20,
  },
  lowerBody: {
    alignItems: 'center',
  },
  fullWidth: {width: '100%'},
  privacyText: {
    textAlign: 'center',
  },
  loginBtn: {
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height * 1.5) / 100,
    borderRadius: (height * 0.8) / 100,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: (height * 0.8) / 100,
    paddingHorizontal: (width * 3) / 100,
  },

  phoneInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: 15,
    color: 'white',
    fontFamily: Theme.fonts.semiBold.fontFamily,
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
  },
  label: {
    color: Theme.colors.black,
    fontSize: 15,
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

    fontFamily: Theme.fonts.medium.fontFamily,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: (width * 2) / 100,
    paddingHorizontal: (width * 10) / 100,
    borderColor: Theme.colors.lightBorderColor,
    width: '100%',
    paddingVertical: (height * 1.5) / 100,
    borderRadius: (height * 0.8) / 100,
  },
  outBtnText: {
    color: Theme.colors.black,
    fontFamily: Theme.fonts.regular.fontFamily,
  },
});
