import { Button } from "@/components/Button";
import CustomText from "@/components/Text";
import { isClerkAPIResponseError, useSignIn, useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Image, SafeAreaView, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();
export default function Index() {
  const { startSSOFlow } = useSSO();
  const { signIn, setActive } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const handleSignInWithGoogle = async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
        // Defaults to current path
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        setErrors(error.errors);
      }
      console.error(error);
    }
  };

  const signInWithPasskey = async () => {
    // 'discoverable' lets the user choose a passkey
    // without auto-filling any of the options
    try {
      const signInAttempt = await signIn?.authenticateWithPasskey({
        flow: "discoverable",
      });

      if (signInAttempt?.status === "complete") {
        if (setActive !== undefined) {
          await setActive({ session: signInAttempt.createdSessionId });
        }
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };
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
          {errors.map((error) => (
            <CustomText key={error.code}>{error.code}</CustomText>
          ))}
        </View>
        <View style={{ flex: 1 }} />
        <Button style={{ marginBottom: 20 }} onPress={signInWithPasskey}>
          Sign In With passkey
        </Button>
        <Button
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
          onPress={handleSignInWithGoogle}
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
