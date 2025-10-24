import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-web'
import { SafeAreaView } from 'react-native-safe-area-context'

function AlertCard({ type, severity }) {
  return (<View style={styles.wrapper}>
    <Text style={styles.h1}>{type}</Text>
    <Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "blue" }}>
        {`Severity: ${severity}`}
      </Text>
    </Text>
    <Text style={{ marginTop: 8 }}>{`Severity: ${severity}`} </Text>
  </View>
  )
}

const alerts = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>alerts</Text>
      </View>
    </SafeAreaView>
  )
}

export default alerts

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});
