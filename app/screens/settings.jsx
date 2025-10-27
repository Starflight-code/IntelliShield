import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ToggleButton from "../components/ToggleButton.jsx"

const Settings = () => {
  const [sendNotificationBeforeAlert, setSendNotificationBeforeAlert] = useState(false);
  const [safetyCheckIns, setSafetyCheckIns] = useState(false);
  const [webLocationAccess, setWebLocationAccess] = useState(false);
  const [safetyProSupressed, setSafetyProSupressed] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ToggleButton text={"Send Notification Before Alert"} buttonText={["No", "Yes"]} state={sendNotificationBeforeAlert} setState={setSendNotificationBeforeAlert} />
      <ToggleButton text={"Safety Check-Ins"} buttonText={["No", "Yes"]} state={safetyCheckIns} setState={setSafetyCheckIns} />
      <ToggleButton text={"Web Location Access"} buttonText={["Off", "On"]} state={webLocationAccess} setState={setWebLocationAccess} />
      <ToggleButton text={"Safety Pro++ \nMembership Reminders"} buttonText={["Remind Me \nTomorrow", "I'm Missing Out"]} state={safetyProSupressed} setState={setSafetyProSupressed} />
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

export default Settings;
