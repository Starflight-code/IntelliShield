import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="panic" />
      <Stack.Screen name="alerts" />
    </Stack>
  );
};

export default RootLayout;
