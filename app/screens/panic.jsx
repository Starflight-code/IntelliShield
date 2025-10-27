import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import ToggleButton from "../components/ToggleButton.jsx"

const { width, height } = Dimensions.get('window');

const PanicButton = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [visibleTo, setVisibleTo] = useState('Friends & Family');
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef(null);
  const progressTimer = useRef(null);

  const handleHoldStart = () => {
    setIsHolding(true);
    setHoldProgress(0);

    progressTimer.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer.current);
          handleSendAlert();
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    holdTimer.current = setTimeout(() => {
      handleSendAlert();
    }, 5000);
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    setHoldProgress(0);

    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }
  };

  const handleSendAlert = () => {
    setIsHolding(false);
    setHoldProgress(0);

    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }

    Alert.alert(
      'Panic Alert Sent!',
      `Emergency alert has been sent to ${visibleTo}.\n\nMessage: ${message || 'No message provided'}`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const toggleVisibleTo = () => {
    setVisibleTo(visibleTo === 'Friends & Family' ? 'Emergency Services' : 'Friends & Family');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panic Button</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.label}>Message (250 character maximum)</Text>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter your emergency message..."
          multiline
          maxLength={250}
          textAlignVertical="top"
        />
        <Text style={styles.characterCount}>{message.length}/250</Text>
      </View>

      <ToggleButton text={"Confirm Alert"} buttonText={["No", "Yes"]} state={confirmAlert} setState={setConfirmAlert} />

      <View style={styles.visibleContainer}>
        <Text style={styles.label}>Visible To</Text>
        <TouchableOpacity
          style={styles.visibleButton}
          onPress={toggleVisibleTo}
        >
          <Text style={styles.visibleText}>{visibleTo}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sendContainer}>
        <TouchableOpacity
          style={[
            styles.sendButton,
            isHolding && styles.sendButtonHolding,
            holdProgress >= 100 && styles.sendButtonComplete
          ]}
          onPressIn={handleHoldStart}
          onPressOut={handleHoldEnd}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>
            {isHolding ? `Send (${Math.ceil((100 - holdProgress) / 20)}s)` : 'Send (Hold for 5 seconds)'}
          </Text>
          {isHolding && (
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${holdProgress}%` }
                ]}
              />
            </View>
          )}
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
  messageContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  messageInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 5,
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
  toggleButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  toggleTextActive: {
    color: 'white',
  },
  visibleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  visibleButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  visibleText: {
    fontSize: 16,
    color: '#333',
  },
  sendContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#90EE90',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: width * 0.8,
    position: 'relative',
    overflow: 'hidden',
  },
  sendButtonHolding: {
    backgroundColor: '#7CCD7C',
  },
  sendButtonComplete: {
    backgroundColor: '#4CAF50',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

export default PanicButton;
