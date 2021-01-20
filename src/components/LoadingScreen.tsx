import { Image, View, StyleSheet } from "react-native";
import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import marlowGif from "../../assets/images/marlow_gif.gif";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginTop: wp("15%"),
  },
  view: {
    flex: 1,
    marginBottom: wp("15%"),
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  logoWidthSize?: number;
  logoHeightSize?: number;
}

const LoadingScreen = (props: Props) => {
  const { logoWidthSize, logoHeightSize } = props;
  const style =
    logoWidthSize && logoHeightSize
      ? {
          width: Number(logoWidthSize),
          height: Number(logoHeightSize),
        }
      : {};
  return (
    <View style={styles.view}>
      <Image source={marlowGif} style={style} />
    </View>
  );
};

export default LoadingScreen;
