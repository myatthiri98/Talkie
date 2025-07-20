import CustomText from "@/components/Text";
import { Image, SafeAreaView, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ gap: 20, alignItems: "center" }}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
        />
        <CustomText style={{ fontSize: 32, fontWeight: "bold" }}>
          Modern Chat App
        </CustomText>
        <CustomText>The best chat app for your business</CustomText>
      </View>
    </SafeAreaView>
  );
}
