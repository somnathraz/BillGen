import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const SignInWithGoogle = async (
  showSnackbar,
  navigation,
  setUserData,
  userData,
) => {
  try {
    GoogleSignin.configure({
      webClientId:
        '234843807306-hvm3tef5br6bhven2voo8rab49gpi5a1.apps.googleusercontent.com',
    });
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    await GoogleSignin.signOut();
    const {
      data: {idToken},
    } = await GoogleSignin.signIn();
    // console.log(idToken, 'idToken');

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const data = await auth().signInWithCredential(googleCredential);
    console.log(data, 'data from google');
    setUserData({...userData, email: data.additionalUserInfo.profile.email});

    const response = await fetch('http://192.168.31.130:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.additionalUserInfo.profile.email,
        username: data.user.displayName,
      }),
    });

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

    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.log(error, 'from Google');
    switch (error.code) {
      case statusCodes.SIGN_IN_CANCELLED:
        // user cancelled the login flow
        showSnackbar('Sign in cancelled');
        break;
      case statusCodes.IN_PROGRESS:
        // operation (eg. sign in) already in progress
        showSnackbar('already in progress');
        break;
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        showSnackbar('play services not available or outdated');
        // play services not available or outdated
        break;
      default:
      // some other error happened
    }
  }
};

export const handleLogout = async navigation => {
  try {
    // Google Sign Out
    await GoogleSignin.signOut();

    // Firebase Sign Out (for both Google and Apple)
    await auth().signOut();

    // Clear any user-related data from AsyncStorage
    // Navigate back to the Login screen
    navigation.replace('Login');
  } catch (error) {
    console.error('Failed to logout:', error);
  }
};
export const checkSignInStatus = async () => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      return currentUser; // User is signed in, either with Google or Apple
    }
    return null; // User is not signed in
  } catch (error) {
    console.error('Error checking sign-in status:', error);
    // showToast('Error checking sign-in status');
    throw error;
  }
};

// export const SignInWithApple = async (setLoading, showSnackbar) => {
//   try {
//     setLoading(true);

//     // Start the sign-in request
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//     });

//     // Ensure Apple returned an identity token
//     if (!appleAuthRequestResponse.identityToken) {
//       throw new Error('Apple Sign-In failed - no identity token returned.');
//     }

//     // Create a Firebase credential from the response
//     const {identityToken, nonce} = appleAuthRequestResponse;
//     const appleCredential = auth.AppleAuthProvider.credential(
//       identityToken,
//       nonce,
//     );

//     // Sign in the user with the credential
//     return auth().signInWithCredential(appleCredential);
//   } catch (error) {
//     console.error('Error during Apple Sign-In:', error);
//     showSnackbar('Failed to sign in with Apple');
//   } finally {
//     setLoading(false);
//   }
// };
