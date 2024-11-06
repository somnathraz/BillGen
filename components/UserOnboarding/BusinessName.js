import React, {useState} from 'react';
import {View, StyleSheet, StatusBar, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../../Theme/Theme';

const BusinessName = () => {
  const [nameInput, setNameInput] = useState();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.white} />
      <View>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter your Business name"
          value={nameInput}
          onChangeText={setNameInput}
        />
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
});
