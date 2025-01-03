import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Theme from '../../Theme/Theme';
import {useNavigation} from '@react-navigation/native';
import {useUserData} from '../../context/UserContext';
import Progress from './ProgressBar';
const {width, height} = Dimensions.get('window');
const BusinessIndustry = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const navigation = useNavigation();
  const {userData, setUserData} = useUserData();

  const popularIndustries = [
    {
      id: '1',
      name: 'Electronics',
      details: 'ACs, TVs, Laptops, Geysers, Washing machines',
    },
    {
      id: '2',
      name: 'FMCG',
      details: 'Rice, Oils, Dals, Tea, Beverages, Cosmetics',
    },
    {
      id: '3',
      name: 'Garment/Clothing',
      details: 'T-shirts, Shirts, Pants, Suits, Sarees, Dresses',
    },
    {
      id: '4',
      name: 'Hardware',
      details: 'Pipes, PVC tubes, Pumps, Fittings, Bolts',
    },
    {
      id: '5',
      name: 'Mobile and accessories',
      details: 'Smartphones, Chargers, Earphones',
    },
  ];

  const allIndustries = [
    ...popularIndustries,
    {
      id: '6',
      name: 'Agriculture',
      details: 'Grains, Fertilisers, Seeds, Pesticides, Poultry',
    },
    {
      id: '7',
      name: 'Automobile',
      details: 'Tyres, Spare parts, Lubricants, Accessories',
    },
    {
      id: '8',
      name: 'Construction',
      details: 'Cement, Bricks, Concrete, Steel, Glass',
    },
    {
      id: '9',
      name: 'Education',
      details: 'Books, Stationery, E-Learning, Online Courses',
    },
    {
      id: '10',
      name: 'Healthcare',
      details: 'Pharmaceuticals, Medical Equipment, Wellness Products',
    },
    {
      id: '11',
      name: 'Hospitality',
      details: 'Hotels, Restaurants, Catering, Travel',
    },
    {
      id: '12',
      name: 'Information Technology',
      details: 'Software, Hardware, Networking, IT Services',
    },
    {
      id: '13',
      name: 'Media & Entertainment',
      details: 'Movies, Music, News, Broadcasting',
    },
    {
      id: '14',
      name: 'Real Estate',
      details: 'Commercial Properties, Residential Properties, Land',
    },
    {
      id: '15',
      name: 'Retail',
      details: 'Supermarkets, Clothing Stores, Electronics Stores',
    },
    {
      id: '16',
      name: 'Telecommunication',
      details: 'Internet, Mobile Networks, Communication Services',
    },
    {
      id: '17',
      name: 'Transport & Logistics',
      details: 'Shipping, Trucking, Courier Services',
    },
    {
      id: '18',
      name: 'Financial Services',
      details: 'Banking, Insurance, Investment, Fintech',
    },
    {
      id: '19',
      name: 'Chemical',
      details: 'Petrochemicals, Paints, Cleaning Agents, Industrial Gases',
    },
    {
      id: '20',
      name: 'Energy',
      details: 'Renewable Energy, Oil and Gas, Power Supply',
    },
    {
      id: '21',
      name: 'Textiles',
      details: 'Cotton, Silk, Synthetic Fibers, Apparel Manufacturing',
    },
    {
      id: '22',
      name: 'Mining',
      details: 'Coal, Minerals, Precious Metals, Extraction',
    },
    {
      id: '23',
      name: 'Food & Beverage',
      details: 'Packaged Foods, Dairy, Snacks, Alcoholic Beverages',
    },
    {
      id: '24',
      name: 'Beauty & Personal Care',
      details: 'Skincare, Haircare, Makeup, Personal Hygiene',
    },
    {
      id: '25',
      name: 'Pharmaceuticals',
      details: 'Medicines, Healthcare Products, Medical Research',
    },
  ];

  const handleIndustrySelect = (id, name) => {
    setSelectedIndustry(id);
    setUserData({...userData, businessIndustry: name});
    navigation.navigate('BusinessType');
  };

  const renderIndustry = ({item}) => (
    <TouchableOpacity
      onPress={() => handleIndustrySelect(item.id, item.name)}
      style={styles.industryItem}>
      <View style={styles.radioCircle}>
        {selectedIndustry === item.id && <View style={styles.selectedRb} />}
      </View>
      <View>
        <Text style={styles.industryName}>{item.name}</Text>
        {item.details ? (
          <Text style={styles.industryDetails}>{item.details}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.container}>
        <Progress value={0.66} />
        <Text style={styles.heading}>Select Industry</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Your Industry"
        />
        <ScrollView>
          <Text style={styles.header}>Popular Industries</Text>
          <FlatList
            data={popularIndustries}
            keyExtractor={item => item.id}
            renderItem={renderIndustry}
            scrollEnabled={false}
            contentContainerStyle={{paddingBottom: (height * 2) / 100}}
          />

          <Text style={styles.header}>All Industries</Text>
          <FlatList
            data={allIndustries}
            keyExtractor={item => item.id}
            renderItem={renderIndustry}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  container: {
    flex: 1,
    gap: (height * 1) / 100,
    paddingVertical: (height * 2) / 100,
    paddingHorizontal: (height * 2) / 100,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: (height * 3) / 100,
    color: Theme.colors.black,
    fontFamily: Theme.fonts.bold.fontFamily,
    fontWeight: Platform.OS === 'ios' ? '700' : 'normal',
  },
  searchInput: {
    height: (height * 6) / 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: (width * 3) / 100,
    paddingLeft: (width * 5) / 100,
    marginBottom: (height * 3) / 100,
  },
  header: {
    fontSize: (width * 6) / 100,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  industryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: (width * 3) / 100,
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
  industryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  industryDetails: {
    fontSize: 12,
    color: '#888',
  },
});

export default BusinessIndustry;
