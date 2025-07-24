import CustomText from '@/components/Text'
import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'

export default function Chat() {
  const { chat: chatId } = useLocalSearchParams()
  return (
    <View>
      <CustomText>{chatId}</CustomText>
    </View>
  )
}
