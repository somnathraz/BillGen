import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Dimensions,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../../Theme/Theme';
import {useUserData} from '../../context/UserContext';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const BusinessName = () => {
  const [nameInput, setNameInput] = useState('');
  const navigation = useNavigation();
  const {userData, setUserData} = useUserData();
  const updateName = () => {
    setUserData({
      ...userData,
      businessName: nameInput,
    });
    navigation.navigate('BusinessIndustry');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Theme.colors.white}
        />
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            placeholder="Enter your Business name"
            value={nameInput}
            onChangeText={setNameInput}
          />

          <Pressable
            style={[
              styles.loginBtn,
              {
                backgroundColor:
                  nameInput === ''
                    ? Theme.colors.inactive
                    : Theme.colors.primary,
              },
            ]}
            disabled={nameInput === '' ? true : false}
            onPress={() => updateName()}>
            <Text style={styles.btnText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BusinessName;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  container: {
    paddingHorizontal: (width * 5) / 100,
  },
  input: {
    backgroundColor: Theme.colors.accent1,
    height: (height * 5) / 100,
    borderRadius: 5,
    paddingHorizontal: (width * 2) / 100,
  },
  loginBtn: {
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height * 1.5) / 100,
    borderRadius: (height * 0.8) / 100,
  },
  btnText: {
    fontSize: 15,
    color: 'white',
    fontFamily: Theme.fonts.semiBold.fontFamily,
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
  },
  inputWrap: {
    gap: 10,
  },
});
