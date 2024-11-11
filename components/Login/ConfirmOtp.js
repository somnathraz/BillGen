import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import Theme from '../../Theme/Theme';
const {height} = Dimensions.get('window');

const ConfirmOtp = ({confirmCode, setCode, loading}) => {
  //   const [text, setText] = React.useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([null, null, null, null, null, null]);

  const handleDigitChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setCode(newOtp);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  const [remainingSeconds, setRemainingSeconds] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingSeconds > 0) {
        setRemainingSeconds(remainingSeconds - 1);
      } else {
        clearInterval(intervalId);
        // Handle timer completion (optional)
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
  }, [remainingSeconds]); // Dependency array ensures the effect runs only when remainingSeconds changes

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime =
    minutes > 0
      ? `${minutes}:${seconds.toString().padStart(2, '0')}`
      : `${seconds}s`;

  const buttonEnabled = otp.every(digit => digit !== ''); // Check if all digits are not empty strings

  return (
    <View style={styles.popup}>
      <View style={styles.header}>
        <View style={styles.headingWrapper}>
          <Text style={styles.hcontent}>OTP sent to your mobile number.</Text>
        </View>
        <View style={styles.parrentcontainer}>
          <View style={styles.container}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={text => handleDigitChange(text, index)}
              />
            ))}
          </View>
          <View style={styles.otpstyle}>
            {remainingSeconds === 0 ? (
              <Text style={styles.resendText}>Resend OTP</Text>
            ) : (
              <>
                <Text style={styles.text}>{formattedTime}</Text>
                <Text>Enter the OTP</Text>
              </>
            )}
          </View>
        </View>

        <Button
          style={buttonEnabled ? styles.namebtn : styles.enamebtn}
          mode="contained"
          disabled={!buttonEnabled}
          uppercase
          onPress={confirmCode}
          labelStyle={styles.confirmText}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            'Continue'
          )}
        </Button>
      </View>
    </View>
  );
};

export default ConfirmOtp;
const styles = StyleSheet.create({
  popup: {
    backgroundColor: 'white',
  },
  parrentcontainer: {
    gap: 15,
  },
  otpstyle: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  headingWrapper: {
    gap: 10,
  },
  header: {
    gap: 40,
  },
  hcontent: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Theme.fonts.semiBold.fontFamily,
  },
  container: {
    // paddingTop: '5%',
    flexDirection: 'row',
    gap: 10,
    // justifyContent: 'space-between',
  },
  resendText: {
    color: Theme.colors.primary,
    fontWeight: '600',
    fontFamily: Theme.fonts.bold.fontFamily,
  },
  input: {
    width: 50,
    height: 50,
    // borderWidth: 1,
    // borderBottomColor: '#185BA9',
    textAlign: 'center',
    backgroundColor: Theme.colors.accent2,
  },
  namebtn: {
    // marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height * 0.5) / 100,
    borderRadius: (height * 0.8) / 100,
    backgroundColor: Theme.colors.primary,
  },
  enamebtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height * 0.5) / 100,
    borderRadius: (height * 0.8) / 100,
    backgroundColor: Theme.colors.inactive,
  },
  confirmText: {
    fontSize: 18,
    color: 'white',
    fontFamily: Theme.fonts.regular.fontFamily,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Theme.fonts.bold.fontFamily,
  },
});
