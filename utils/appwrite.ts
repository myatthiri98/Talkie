import { Client, Databases } from 'react-native-appwrite'

if (
  !process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID ||
  !process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID
) {
  throw new Error('EXPO_PUBLIC_APPWRITE_PROJECT_ID is not set')
}

const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: 'com.myatthiri.chattalk',
  db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  col: {
    chatrooms: '687f62ce00310e1fe7a0',
    messages: '687f62b80008545a1351',
  },
}

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform)

const database = new Databases(client)

export { appwriteConfig, client, database }
