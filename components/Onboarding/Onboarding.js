import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.bigBox}>
          <Text style={styles.heading}>
            New approach for your Finance
          </Text>
          <Text style={styles.desc}>
          Now your finances are in one place and always under control
          </Text>
          <View style={styles.imgWrapper}>
            <Image source={require('../../assets/fonts/Images/Onboarding1.png')}
            style={styles.OnboardingImg}/>
          </View>
        </View>
        <View style={styles.smallBox}>
          <TouchableOpacity style={styles.button} // Apply custom styles here
            onPress={() => {
              // Handle button press
            }}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          <View style={styles.dotsContainer}>
            <View style={styles.dotActive} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingHorizontal: (width * 3.5) / 100,
    paddingTop:(width*8/100),
    
    gap:20,
  },
  bigBox:{
    backgroundColor: '#CDE3F3',
    paddingHorizontal: (width*3.5/100),
    paddingTop: height*5/100,
    borderRadius: height*3/100,
    height: height*60/100,
  },
  smallBox:{
    backgroundColor: '#CDE3F3',
    paddingHorizontal: (width*6/100),
    paddingVertical: height*3/100,
    borderRadius: height*3/100,
    
    // height: height*10/100,
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: Theme.fonts.semiBold.fontFamily,
    fontSize: 56,
    lineHeight:60,
    color: '#000',
    textAlign: 'left',
    // fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
  },
  desc: {
    fontFamily: Theme.fonts.regular.fontFamily,
    color: Theme.colors.descText,
    textAlign: 'left',
    fontSize: 20,
    lineHeight:28,
    // paddingLeft:width*2.5/100,
  },
  imgWrapper:{
    // position:'absolute',
    // right:0,
    // bottom: 0,
    marginTop: height*31/100,
    marginRight: -(width*3.5/100),
  },
  OnboardingImg:{
    alignSelf:'flex-end',
    position:'absolute',
    right:0,
    bottom: 0,
  },
  button:{
    backgroundColor: 'black',
    flexDirection:"row",
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: height*2/100,
    paddingHorizontal: (width*3.5/100),
    paddingVertical: 15,
    width: '100%',
  },
  buttonText:{
    fontFamily: Theme.fonts.regular.fontFamily,
    color: 'white',
    fontSize: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 20, // Space above the dots
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: Theme.colors.primary, // Inactive dot color
    marginHorizontal: 5,
  },
  dotActive: {
    width: 11,
    height: 11,
    borderRadius: 5,
    backgroundColor: Theme.colors.primary, // Active dot color
    marginHorizontal: 5,
  },
});
