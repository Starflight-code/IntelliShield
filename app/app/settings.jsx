import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';


const PanicButton = () => {
  const [sendNotificationBeforeAlert, setSendNotificationBeforeAlert] = useState(false);
  const [safetyCheckIns, setSafetyCheckIns] = useState(false);
  const [webLocationAccess, setWebLocationAccess] = useState(false);
  const [safetyProSupressed, setSafetyProSupressed] = useState(false);

  const toggleSendBeforeAlert = () => {
    setSendNotificationBeforeAlert(!sendNotificationBeforeAlert);
  };

  const toggleSafetyCheckIns = () => {
    setSafetyCheckIns(!safetyCheckIns);
  };

  const toggleWebLocationAccess = () => {
    setWebLocationAccess(!webLocationAccess);
  };

  const toggleSafetyPro = () => {
    setSafetyProSupressed(!safetyProSupressed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.confirmContainer}>
        <Text style={styles.label}>Send Notification Before Alert</Text>
        <TouchableOpacity
          style={[styles.toggleButton]}
          onPress={toggleSendBeforeAlert}
        >
          <Text style={[styles.toggleText]}>
            {sendNotificationBeforeAlert ? "Yes" : "No"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmContainer}>
        <Text style={styles.label}>Safety Check-Ins</Text>
        <TouchableOpacity
          style={[styles.toggleButton]}
          onPress={toggleSafetyCheckIns}
        >
          <Text style={[styles.toggleText]}>
            {safetyCheckIns ? "Yes" : "No"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmContainer}>
        <Text style={styles.label}>Web Location Access</Text>
        <TouchableOpacity
          style={[styles.toggleButton]}
          onPress={toggleWebLocationAccess}
        >
          <Text style={[styles.toggleText]}>
            {webLocationAccess ? "On" : "Off"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmContainer}>
        <Text style={styles.label}>{"Safety Pro++ \nMembership Reminders"}</Text>
        <TouchableOpacity
          style={[styles.toggleButton]}
          onPress={toggleSafetyPro}
        >
          <Text style={[styles.toggleText]}>
            {safetyProSupressed ? "I'm Missing Out" : "Remind Me \nTomorrow"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.confirmContainer}>
        <TouchableOpacity>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Licenses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  confirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PanicButton;
