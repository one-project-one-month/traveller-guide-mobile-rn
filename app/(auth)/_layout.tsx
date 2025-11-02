import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='welcome' options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="terms-and-conditions"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "Register",
          headerTransparent: true,
          headerTitleStyle: { fontFamily: 'Poppin', fontSize: 20 }
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "Forgot Password",
          headerTransparent: true,
          headerTitleStyle: { fontFamily: 'Poppin', fontSize: 20 }
        }}
      />
      <Stack.Screen
        name="verification"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "Verification",
          headerTransparent: true,
          headerTitleStyle: { fontFamily: 'Poppin', fontSize: 20 }
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "Create New Password",
          headerTransparent: true,
          headerTitleStyle: { fontFamily: 'Poppin', fontSize: 20 }
        }}
      />
      <Stack.Screen
        name="password-changed"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerBackVisible: true,
          headerTitle: "",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="account-created"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default _layout
