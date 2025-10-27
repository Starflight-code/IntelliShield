import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import alert_entries from '../assets/alert_entries'
import { useRouter } from 'expo-router'

function AlertCard({ type, severity, use_key }) {
  return (<View key={use_key} style={styles.wrapper}>
    <Text style={[styles.h2, { fontWeight: "bold" }]}>{type}</Text>
    <Text style={styles.h3}>{`Severity: ${severity}`} </Text>
  </View>
  )
}

const alerts = () => {
  let iter = 0;
  let router = useRouter();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.flex} edges={['top']}>
        <Text style={[styles.h1, { textAlign: "center" }]}>
          Alerts
        </Text>
        <ScrollView>
          {alert_entries.map((alert) => {
            return (
              <AlertCard type={alert["type"]} severity={alert["severity"]} use_key={iter++} />
            )
          })}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default alerts

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    rowGap: "0.5em",
    flexDirection: "column",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgrey",
    borderRadius: 15,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  h1: {
    fontSize: 36,
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 18,
  },
});
