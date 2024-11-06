import React from 'react';
import {Pressable, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = () => {
  const navigation = useNavigation();
  const logout = async () => {
    await auth().signOut();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  };
  return (
    <SafeAreaView edges={['top', 'right', 'left']}>
      <View>
        <Text>HOme</Text>
        <Pressable onPress={logout}>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Home;
