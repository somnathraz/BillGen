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
    // Navigate to next screen if necessary
  };

  const renderBusinessType = ({item}) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleTypeSelect(item.id, item.name)}
      style={styles.typeItem}>
      <View style={styles.radioCircle}>
        {selectedType === item.id && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.typeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.heading}>Select Business Type</Text>
        {businessTypes.map(type => renderBusinessType({item: type}))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: Theme.colors.white},
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  heading: {fontSize: 20, fontWeight: 'bold', marginBottom: 16},
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2196f3',
  },
  typeName: {fontSize: 16, fontWeight: '500'},
});

export default BusinessType;
