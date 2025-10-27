import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="login" /> */}
      <Stack.Screen name="home" options={{ title: "Home" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="panic" options={{ title: "Panic" }} />
      <Stack.Screen name="alerts" options={{ title: "Alerts" }} />
    </Stack>
  );
};

export default RootLayout;
