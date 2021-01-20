import React from "react";
import { View } from "react-native";
import { PressReleases } from "../../interfaces";
import styles from "../../styles/more_screens/NewsCardStyles";
import Carousel from "react-native-snap-carousel";
import Layout from "../../constants/styles/Layout";
import Card from "../Card";
import { PRESS_RELEASES } from "../../constants/NewsConstants";
import Text from "../StyledText";

import { useTheme } from "@react-navigation/native";
const slideWidth = Layout.window.width - (105 * Layout.window.width) / 100;
const itemWidth = Layout.window.width - (20 * Layout.window.width) / 100;

type Props = {
  items: PressReleases[];
  navigate: (arg: string) => void;
  route: string;
};

const LatestReleasesSection = (props: Props) => {
  const { items, navigate, route } = props;
  const theme = useTheme();

  const renderItem = ({
    item,
    index,
  }: {
    item: PressReleases;
    index: number;
  }) => {
    return (
      <Card
        key={index}
        screen={route}
        navigate={navigate}
        title={item.title}
        summary={item.summary}
        hasReadMore={true}
        item={{ ...item, newItemType: PRESS_RELEASES }}
      />
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.colors.newBackgroundColor,
      }}
    >
      <Text style={{ ...styles.mainHeader, color: theme.colors.newsText }}>
        Latest Press Releases
      </Text>
      <Carousel
        removeClippedSubviews={false}
        sliderWidth={slideWidth}
        itemWidth={itemWidth}
        renderItem={renderItem}
        data={items}
      />
    </View>
  );
};

export default LatestReleasesSection;
