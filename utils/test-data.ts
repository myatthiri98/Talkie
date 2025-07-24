import { ChatRoom } from "./types";


export const chatRooms: ChatRoom[] =[
  {
    $id: '1',
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $collectionId: "chatrooms",
    $databaseId: "main",
    $permissions: [],
    title: "Chat Room 1",
    description: "Chat Room 1 Description",
  },
  {
    $id: "2",
    $createdAt: new Date().toISOString(),
    $updatedAt: new Date().toISOString(),
    $collectionId: "chatrooms",
    $databaseId: "main",
    $permissions: [],
    title: "Chat Room 2",
    description: "Chat Room 2 Description", 
  }

]