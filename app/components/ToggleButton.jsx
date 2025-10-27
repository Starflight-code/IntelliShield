import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ToggleButton({ text, buttonText, state, setState }) {
  return (
    <View style={styles.confirmContainer}>
      <Text style={styles.label}>{text}</Text>
      <TouchableOpacity
        style={[styles.toggleButton]}
        onPress={() => setState(!state)}
      >
        <Text style={[styles.toggleText]}>
          {state ? buttonText[1] : buttonText[0]}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
