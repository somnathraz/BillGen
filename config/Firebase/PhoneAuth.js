// Handle the phone sign-in
import auth from '@react-native-firebase/auth';

export const signInWithPhoneNumber = async (
  phoneNumber,
  countryCode,
  setConfirm,
  showSnackbar,
) => {
  if (phoneNumber.trim() === '') {
    showSnackbar('Please enter a valid phone number.');
    return;
  }
  const number = countryCode + phoneNumber;
  console.log(number);

  try {
    showSnackbar('A verification code has been sent to your phone.');
    const confirmation = await auth().signInWithPhoneNumber(number);
    // console.log(confirmation);
    setConfirm(confirmation);
  } catch (error) {
    console.error(error);
    showSnackbar('Failed to send verification code.');
  }
};

// Confirm the OTP code
export const confirmCode = async (
  code,
  confirm,
  navigation,
  showSnackbar,
  phone_number,
) => {
  try {
    await confirm.confirm(code.join(''));
    showSnackbar('Phone number verified successfully!');
    const response = await fetch('http://192.168.1.20:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone_number}),
    });
    console.log(response, 'before');

    const result = await response.json();
    console.log(result, 'from backend');

    if (response.status === 201) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BusinessName',
          },
        ],
      });
      showSnackbar('successfully updated');
    } else if (response.status === 409) {
      showSnackbar('Logged in successful');
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'BusinessName',
          },
        ],
      });
    } else {
      showSnackbar('Please try again.');
    }
  } catch (error) {
    console.log('Invalid code', error);
    showSnackbar('Invalid code. Please try again.');
  }
};
