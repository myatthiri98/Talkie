import Input from '@/components/Input'
import CustomText from '@/components/Text'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export default function NewRoom() {
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
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
