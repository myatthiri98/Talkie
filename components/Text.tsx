import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface CustomTextProps extends RNTextProps {
  children: React.ReactNode;
}

export default function CustomText({
  children,
  style,
  ...props
}: CustomTextProps) {
  return (
    <RNText style={[{ color: "white" }, style]} {...props}>
      {children}
    </RNText>
  );
}
