// Handle the phone sign-in
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

export const signInWithPhoneNumber = async (
  phoneNumber,
  countryCode,
  setConfirm,
) => {
  if (phoneNumber.trim() === '') {
    Alert.alert('Error', 'Please enter a valid phone number.');
    return;
  }
  const number = countryCode + phoneNumber;
  try {
    const confirmation = await auth().signInWithPhoneNumber(number);
    setConfirm(confirmation);
    Alert.alert('OTP Sent', 'A verification code has been sent to your phone.');
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to send verification code.');
  }
};

// Confirm the OTP code
export const confirmCode = async (code, confirm) => {
  try {
    await confirm.confirm(code);
    Alert.alert('Success', 'Phone number verified successfully!');
  } catch (error) {
    console.log('Invalid code.');
    Alert.alert('Error', 'Invalid code. Please try again.');
  }
};
