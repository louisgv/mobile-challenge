import { Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

export const screenHeight = Platform.select({
  ios: height,
  android: Platform.Version < 21 ? height - 25 : height
});

export const screenWidth = width

const statusBarHeight = Platform.select({
  ios: 22,
  android: Platform.Version >= 21 ? 25 : 0
});

export const headerHeight = statusBarHeight + 55;