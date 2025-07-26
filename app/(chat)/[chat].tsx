import { IconSymbol } from '@/components/IconSymbol'
import CustomText from '@/components/Text'
import { appwriteConfig, client, database } from '@/utils/appwrite'
import { Gray, Primary, Secondary, white } from '@/utils/colors'
import { ChatRoom, Message } from '@/utils/types'
import { useUser } from '@clerk/clerk-expo'
import { LegendList } from '@legendapp/list'
import { useHeaderHeight } from '@react-navigation/elements'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import { ID, Query } from 'react-native-appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Chat() {
  const { chat: chatId } = useLocalSearchParams()
  const { user } = useUser()

  if (!chatId) {
    return <CustomText>We couldn't find this chat room 🥲</CustomText>
  }

  const [messageContent, setMessageContent] = useState('')
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const headerHeight = Platform.OS === 'ios' ? useHeaderHeight() : 0

  useEffect(() => {
    handleFirstLoad()
  }, [])

  useEffect(() => {
    const channel = `databases.${appwriteConfig.db}.collections.${appwriteConfig.col.chatrooms}.documents.{chatId}`

    const unsubscribe = client.subscribe(channel, (e) => {
      console.log(e)
      getMessages()
    })

    return () => unsubscribe()
  }, [chatId])

  const handleFirstLoad = async () => {
    try {
      await getChatRoom()
      await getMessages()
    } catch (e) {
      console.error(e)
    }
  }

  const getChatRoom = async () => {
    try {
      const data = await database.getDocument(
        appwriteConfig.db,
        appwriteConfig.col.chatrooms,
        chatId as string,
      )
      setChatRoom(data as ChatRoom)
    } catch (e) {
      console.error(e)
    }
  }

  const getMessages = async () => {
    try {
      const { documents } = await database.listDocuments(
        appwriteConfig.db,
        appwriteConfig.col.messages,
        [
          Query.equal('chatRoomId', chatId as string),
          Query.orderAsc('$createdAt'),
          Query.limit(100),
        ],
      )
      setMessages(documents as Message[])
    } catch (error) {
      console.error(error)
    }
  }

  const handleSendMessage = async () => {
    if (messageContent.trim() === '') return

    const message = {
      content: messageContent,
      senderId: user?.id,
      senderName: user?.fullName,
      senderPhoto: user?.imageUrl,
      chatRoomId: chatId,
    }
    try {
      await database.createDocument(
        appwriteConfig.db,
        appwriteConfig.col.messages,
        ID.unique(),
        message,
      )
      setMessageContent('')

      await database.updateDocument(
        appwriteConfig.db,
        appwriteConfig.col.chatrooms,
        chatId as string,
        {
          $updatedAt: new Date().toISOString(),
        },
      )
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: chatRoom?.title,
        }}
      />
      <SafeAreaView style={styles.chatContainer} edges={['bottom']}>
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior="padding"
          keyboardVerticalOffset={headerHeight}
        >
          <LegendList
            data={messages}
            renderItem={({ item }) => {
              const isSender = item.senderId === user?.id
              return (
                <View
                  style={[
                    styles.messageContainer,
                    { alignSelf: isSender ? 'flex-end' : 'flex-start' },
                  ]}
                >
                  {!isSender && (
                    <Image
                      source={{ uri: item.senderPhoto }}
                      style={styles.messageAvatar}
                    />
                  )}
                  <View
                    style={[
                      styles.messageContent,
                      { backgroundColor: isSender ? Primary : Secondary },
                    ]}
                  >
                    <CustomText style={styles.messageSenderName}>
                      {item.senderName}
                    </CustomText>
                    <CustomText>{item.content}</CustomText>
                    <CustomText style={styles.messageTime}>
                      {new Date(item.$createdAt!).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </CustomText>
                  </View>
                </View>
              )
            }}
            keyExtractor={(item) => item?.$id ?? 'unknown'}
            contentContainerStyle={{ padding: 10 }}
            recycleItems={true}
            initialScrollIndex={messages.length - 1}
            alignItemsAtEnd // Aligns to the end of the screen, so if there's only a few items there will be enough padding at the top to make them appear to be at the bottom.
            maintainScrollAtEnd // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainScrollAtEndThreshold={0.5} // prop will check if you are already scrolled to the bottom when data changes, and if so it keeps you scrolled to the bottom.
            maintainVisibleContentPosition //Automatically adjust item positions when items are added/removed/resized above the viewport so that there is no shift in the visible content.
            estimatedItemSize={100} // estimated height of the item
            // getEstimatedItemSize={(info) => { // use if items are different known sizes
            //   console.log("info", info);
            // }}
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Message..."
              value={messageContent}
              onChangeText={setMessageContent}
              style={styles.input}
              multiline
              placeholderTextColor={Gray}
            />
            <Pressable
              disabled={messageContent === ''}
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <IconSymbol
                name="paperplane"
                color={messageContent === '' ? Gray : Primary}
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Gray,
    borderRadius: 20,
    marginHorizontal: 8,
    marginBottom: 10,
  },
  input: {
    minHeight: 40,
    color: white,
    flexGrow: 1,
    flexShrink: 1,
    padding: 10,
  },
  sendButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 6,
    maxWidth: '80%',
  },
  messageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  messageContent: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
  },
  messageSenderName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    textAlign: 'right',
  },
})
