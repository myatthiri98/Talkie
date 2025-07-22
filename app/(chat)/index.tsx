import CustomText from "@/components/Text";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText>Chat</CustomText>
    </View>
  );
}
