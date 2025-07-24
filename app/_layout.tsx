import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { passkeys } from '@clerk/expo-passkeys'
import { DarkTheme, ThemeProvider } from '@react-navigation/native'
import { Slot } from 'expo-router'

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    throw new Error('Missing Publishable Key')
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      __experimental_passkeys={passkeys}
    >
      <ClerkLoaded>
        <ThemeProvider value={DarkTheme}>
          <Slot />
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
