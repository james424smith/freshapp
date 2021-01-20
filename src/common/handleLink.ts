import { Linking } from "react-native";

export const handleLink = (
  redirectType: string,
  destination?: string
): Promise<void> | "" | undefined => {
  if (redirectType === "url") {
    return destination && Linking.openURL(destination);
  } else if (redirectType === "crewcompanion") {
    return destination && Linking.openURL(`crewcompanion://${destination}`);
  } else {
    return destination && Linking.openURL(`${redirectType}:${destination}`);
  }
};
