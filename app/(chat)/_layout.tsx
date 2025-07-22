import { IconSymbol } from "@/components/IconSymbol";
import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, Stack } from "expo-router";
import { Image } from "react-native";

export default function RootLayout() {
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={
        {
          headerTitle: "Chat Rooms",
          headerLargeTitle: true,
          headerLeft: () => (
            <Link href="/profile">
              <Image source={{ uri: user?.imageUrl }} style={{ width: 32, height: 32, borderRadius: 16 }} />
            </Link>
          ),
          headerRight: () => (
            <Link href="/new-room">
              <IconSymbol name="plus" size={24}/>
            </Link>
          )
        }
      } />
      <Stack.Screen name="profile" options={{ presentation: "modal" , headerTitle: "Profile",
        headerLeft: () => (
          <Link dismissTo href="/">
            <IconSymbol name="chevron.left" size={24}/>
          </Link>
        )
      }} />
      <Stack.Screen name="new-room" options={{ presentation: "modal" , headerTitle: "New Chat Room",
        headerLeft: () => (
          <Link dismissTo href="/">
            <IconSymbol name="chevron.left" size={24}/>
          </Link>
        )
      }} />
      <Stack.Screen name="[chat]" options={{ headerTitle: ''}} />
      <Stack.Screen name="settings/[chat]" options={{ presentation: "modal" , headerTitle: "Room Settings",
        headerLeft: () => (
          <Link dismissTo href="/">
            <IconSymbol name="chevron.left" size={24}/>
          </Link>
        )
      }} />
    </Stack>
  );
}
