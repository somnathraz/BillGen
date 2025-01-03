import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useUserData} from '../../context/UserContext';
import Theme from '../../Theme/Theme';
import Progress from './ProgressBar';

const BusinessType = () => {
  const [selectedType, setSelectedType] = useState(null);
  const navigation = useNavigation();
  const {userData, setUserData} = useUserData();

  const businessTypes = [
    {id: '1', name: 'Retailer'},
    {id: '2', name: 'Wholesaler'},
    {id: '3', name: 'Distributor'},
    {id: '4', name: 'Manufacturer'},
    {id: '5', name: 'Services'},
  ];

  const handleTypeSelect = (id, name) => {
    setSelectedType(id);
    setUserData({...userData, businessType: name});
    navigation.navigate('LoadingScreen');
  };

  const renderBusinessType = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleTypeSelect(item.id, item.name)}
      style={[
        styles.card,
        selectedType === item.id ? styles.selectedCard : null,
      ]}>
      <Text
        style={[
          styles.cardText,
          selectedType === item.id ? styles.selectedText : null,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Progress value={1} />
        <Text style={styles.heading}>Select Business Type</Text>
        <View style={styles.cardsContainer}>
          {businessTypes.map(type => renderBusinessType({item: type}))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Theme.colors.white},
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  heading: {fontSize: 20, fontWeight: 'bold', marginBottom: 16, marginTop: 16},
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCard: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default BusinessType;
