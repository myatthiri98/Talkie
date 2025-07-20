import { Button } from "@/components/Button";
import CustomText from "@/components/Text";
import { Image, SafeAreaView, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        <View style={{ flex: 0.1 }} />
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
        <View style={{ flex: 1 }} />
        <Button style={{ marginBottom: 20 }}>Sign In With passkey</Button>
        <Button
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            source={require("@/assets/images/google-icon.png")}
            style={{ width: 20, height: 20 }}
          />
          <CustomText style={{ color: "black", fontWeight: "500" }}>
            Sign In With Google
          </CustomText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
