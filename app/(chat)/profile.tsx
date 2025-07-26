import { Button } from '@/components/Button'
import CustomText from '@/components/Text'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const profile = () => {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/(auth)')
  }

  return (
    <View>
      <CustomText>profile</CustomText>
      <Button onPress={handleSignOut}> Sign Out</Button>
    </View>
  )
}

export default profile
