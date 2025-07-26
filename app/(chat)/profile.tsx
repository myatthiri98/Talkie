import { Button } from '@/components/Button'
import CustomText from '@/components/Text'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const profile = () => {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/(auth)')
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.imageUrl }} style={styles.imageContainer} />
      <View style={styles.infoContainer}>
        <CustomText style={styles.userName}>{user?.fullName}</CustomText>
        <CustomText>{user?.emailAddresses[0].emailAddress}</CustomText>
      </View>
      <Button onPress={handleSignOut}> Sign Out</Button>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})
