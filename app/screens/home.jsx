import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const HomePage = () => {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [crimesPrevented, setCrimesPrevented] = useState(0);

  useEffect(() => {
    getCurrentLocation();
    generateCrimeMetrics();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationError('Location permission denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      setLocationError('Unable to get location');
    }
  };

  const generateCrimeMetrics = () => {
    const crimes = Math.floor(Math.random() * 10) + 1;
    setCrimesPrevented(crimes);
  };

  const handlePanic = () => {
    router.push('/panic');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleAlerts = () => {
    router.push('/alerts');
  };

  const handleUsers = () => {
    router.push('/users');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.assignmentHeader}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appTitle}>IntelliShield</Text>
        <Text style={styles.courseInfo}>Mobile Application Development</Text>
        <Text style={styles.studentInfo}>Developed by: David and Ben</Text>
        <Text style={styles.courseDetails}>Course: CS 3720-02 | Semester: Fall 2025</Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>

        <View style={styles.topRow}>
          <View style={styles.crimeMetricsBox}>
            <Text style={styles.crimeNumber}>{crimesPrevented}</Text>
            <Text style={styles.crimeLabel}>Crimes</Text>
            <Text style={styles.crimeLabel}>Prevented</Text>
            <Text style={styles.crimeTime}>(Last Hour)</Text>
          </View>

          <TouchableOpacity style={[styles.settingsBox, {marginRight: 10}]} onPress={handleAlerts}>
            <Text style={styles.settingsText}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingsBox, {marginRight: 10}]} onPress={handleUsers}>
            <Text style={styles.settingsText}>Users</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingsBox} onPress={handleSettings}>
            <Text style={styles.settingsText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>All Systems Green</Text>
      </View>
      <TouchableOpacity style={styles.panicBox} onPress={handlePanic}>
        <Text style={styles.panicText}>Panic</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            {location ?
              `📍 Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` :
              locationError || 'Loading location...'
            }
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  assignmentHeader: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  logo: {
    width: width * 0.15,
    height: width * 0.15,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  courseInfo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 4,
  },
  studentInfo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  courseDetails: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  crimeMetricsBox: {
    backgroundColor: '#90EE90',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  crimeNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  crimeLabel: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  crimeTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  settingsBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  statusBox: {
    backgroundColor: '#90EE90',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  panicBox: {
    backgroundColor: '#FFB6C1',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  panicText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  mapContainer: {
    height: height * 0.4,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  mapNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default HomePage;
