import Input from '@/components/Input'
import CustomText from '@/components/Text'
import { appwriteConfig, database } from '@/utils/appwrite'
import { Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { ID } from 'react-native-appwrite'

export default function NewRoom() {
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreateRoom = async () => {
    setIsLoading(true)
    try {
      await database.createDocument(
        appwriteConfig.db,
        appwriteConfig.col.chatrooms,
        ID.unique(),
        {
          title: roomName,
          description: roomDescription,
        },
      )
      router.back()
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Stack.Screen options={{
        headerRight: () => (
          <Button title={isLoading ? 'Creating...' : 'Create'} onPress={handleCreateRoom} disabled={roomName === ''} />
        )
      }} />
      <View style={styles.container}>
        <CustomText>New Room</CustomText>
        <Input
          placeholder="Room Name"
          value={roomName}
          onChangeText={setRoomName}
          maxLength={200}
        />
        <Input
          placeholder="Room Description"
          value={roomDescription}
          onChangeText={setRoomDescription}
          maxLength={500}
          style={styles.descriptionInput}
          textAlignVertical="top"
          multiline
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  descriptionInput: {
    height: 100,
  },
})
