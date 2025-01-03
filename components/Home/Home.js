import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Theme from '../../Theme/Theme';

const {width, height} = Dimensions.get('window');

const HomePage = () => {
  const quickActions = [
    {id: '1', title: 'Add Product', action: () => {}},
    {id: '2', title: 'Generate Invoice', action: () => {}},
    {id: '3', title: 'Manage Inventory', action: () => {}},
  ];

  const renderQuickAction = ({item}) => (
    <Pressable style={styles.actionButton} onPress={item.action}>
      <Text style={styles.actionText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to [Business Name]!</Text>
        <Text style={styles.subText}>
          Get started by setting up your business operations.
        </Text>

        {/* Metrics Section */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Revenue</Text>
            <Text style={styles.metricValue}>₹0.00</Text>
            <Text style={styles.metricDesc}>Start tracking your sales</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Low Stock</Text>
            <Text style={styles.metricValue}>-</Text>
            <Text style={styles.metricDesc}>Add products to monitor stock</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricTitle}>Top Products</Text>
            <Text style={styles.metricValue}>-</Text>
            <Text style={styles.metricDesc}>
              Your top products will appear here
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <FlatList
          data={quickActions}
          renderItem={renderQuickAction}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {/* Setup Checklist */}
        <Text style={styles.sectionTitle}>Setup Checklist</Text>
        <View style={styles.checklistContainer}>
          <Text style={styles.checklistItem}>✓ Add your first product</Text>
          <Text style={styles.checklistItem}>
            ✓ Explore insights and reports
          </Text>
          <Text style={styles.checklistItem}>
            ✓ Configure business settings
          </Text>
        </View>
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
    padding: width * 0.05,
  },
  welcomeText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: 10,
  },
  subText: {
    fontSize: width * 0.04,
    color: Theme.colors.grey,
    marginBottom: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: Theme.colors.accent2,
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: Theme.colors.primary,
  },
  metricValue: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  metricDesc: {
    fontSize: width * 0.03,
    color: Theme.colors.grey,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Theme.colors.primary,
  },
  actionButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  actionText: {
    color: Theme.colors.white,
    fontWeight: 'bold',
  },
  checklistContainer: {
    marginTop: 10,
  },
  checklistItem: {
    fontSize: width * 0.04,
    color: Theme.colors.grey,
    marginBottom: 5,
  },
});

export default HomePage;
