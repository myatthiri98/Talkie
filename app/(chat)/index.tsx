import { IconSymbol } from "@/components/IconSymbol";
import CustomText from "@/components/Text";
import { appwriteConfig, database } from "@/utils/appwrite";
import { Gray, Secondary } from "@/utils/colors";
import { ChatRoom } from "@/utils/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Query } from "react-native-appwrite";

export default function Index() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchChatRooms()
  }, [])

  const fetchChatRooms = async() =>{
    try{
    const {documents,total} = await database.listDocuments(
     appwriteConfig.db,
     appwriteConfig.col.chatrooms,
     [Query.limit(100)]
    )
    setChatRooms(documents as ChatRoom[])
    }catch(error){
      console.error(error)
    }
  }

  const handleRefresh = async() =>{
    try{
      setRefreshing(true)
      await fetchChatRooms()
    }catch(error){
      console.error(error)
    }finally{
      setRefreshing(false)
    }
  }

  return (
    <FlatList
      data={chatRooms}
      keyExtractor={(item)=> item.$id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      renderItem={({item}) =>(
        <Link 
        href={{
          pathname: '/[chat]',
          params: {chat: item.$id}
        }}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between', 
            padding: 16,
            borderRadius: 16,
            backgroundColor: Secondary,
            width: '100%',
            gap: 6
          }}
          >
          <ItemTitleAndDescription title={item.title} description={item.description} />
            <IconSymbol name="chevron.right" color={Gray} />
          </View>
        </Link>
      )}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        padding: 16,
        gap: 16
      }}
    />
  )
}


function ItemTitle({title}: {title: string}){
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
      <CustomText style={{fontSize: 17}}>{title}</CustomText>
    </View>
  )
}

function ItemTitleAndDescription({title, description}: {title: string, description: string}){
  return (
    <View style={{gap: 4}}>
      <ItemTitle title={title} />
      <CustomText style={{fontSize: 14, color: Gray}}>{description}</CustomText>
    </View>
  )
}