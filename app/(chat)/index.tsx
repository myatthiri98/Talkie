import { IconSymbol } from "@/components/IconSymbol";
import CustomText from "@/components/Text";
import { Gray, Secondary } from "@/utils/colors";
import { chatRooms } from "@/utils/test-data";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async() =>{}

  return (
    <FlatList
      data={chatRooms}
      keyExtractor={(item)=> item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      renderItem={({item}) =>(
        <Link 
        href={{
          pathname: '/[chat]',
          params: {chat: item.id}
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