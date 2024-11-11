import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    backgroundColor: '#CDE3F3',
    image: require('../../assets/Images/Onboarding1.png'),
    heading: 'New approach for your Finance',
    description: 'Now your finances are in one place and always under control',
  },
  {
    id: '2',
    backgroundColor: '#D4ECCD',
    image: require('../../assets/Images/Onboarding2.png'),
    heading: 'Quick analysis of all expenses',
    description: 'Now your finances are in one place and always under control',
  },
  {
    id: '3',
    backgroundColor: '#F8EED4',
    image: require('../../assets/Images/Onboarding3.png'),
    heading: 'Achieve your financial goals',
    description: 'Now your finances are in one place and always under control',
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: currentIndex, animated: true});
    }
  }, [currentIndex]);

  const renderItem = ({item}) => (
    <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
      <Text style={styles.heading}>{item.heading}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <View style={styles.imgWrapper}>
        <Image source={item.image} style={styles.onboardingImg} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Theme.colors.white}
          barStyle="dark-content"
        />
        <View style={styles.upperBody}>
          <FlatList
            data={slides}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            ref={flatListRef}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
        <View
          style={[
            styles.smallBox,
            {backgroundColor: slides[currentIndex].backgroundColor},
          ]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Login');
              // Handle button press, or navigate to another screen
            }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
              />
            ))}
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
    gap: (height * 2) / 100,
    paddingVertical: (height * 3) / 100,
    paddingHorizontal: width * 0.05, // Center the slides with side margins
  },
  upperBody: {
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: (width * 3.5) / 100, // Padding around FlatList to ensure each slide has margin
    // paddingTop: (height * 5) / 100,
  },
  slide: {
    width: width * 0.9, // Set slide width to 90% of screen width
    height: (height * 64) / 100,
    borderRadius: 20, // Rounded corners for each slide
    paddingHorizontal: (width * 3.5) / 100, // Padding inside each slide
    flexDirection: 'column',
    paddingTop: (height * 1) / 100,
    gap: 10,
  },
  smallBox: {
    paddingHorizontal: (width * 6) / 100,
    paddingVertical: (height * 3) / 100,
    borderRadius: (height * 3) / 100,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: (width * 3.5) / 100,
  },
  heading: {
    fontFamily: Theme.fonts.semiBold.fontFamily,
    fontSize: (width * 13) / 100,
    lineHeight: 60,
    color: '#000',
    textAlign: 'left',
    marginHorizontal: (width * 4) / 100,
  },
  desc: {
    fontFamily: Theme.fonts.regular.fontFamily,
    color: Theme.colors.descText,
    textAlign: 'left',
    fontSize: 20,
    lineHeight: 28,
    marginLeft: (width * 4) / 100,
  },
  imgWrapper: {
    marginTop: (height * 31) / 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  onboardingImg: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    // height:345,
    // width:341,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: (height * 2) / 100,
    paddingHorizontal: (width * 3.5) / 100,
    paddingVertical: 15,
    width: '100%',
  },
  buttonText: {
    fontFamily: Theme.fonts.regular.fontFamily,
    color: 'white',
    fontSize: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});
