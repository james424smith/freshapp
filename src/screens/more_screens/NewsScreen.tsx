import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getAllNews, setRefreshingNews } from "../../redux/actions";
import { News, Newsletters, NewsType, PressReleases } from "../../interfaces";
import MoreNewsSection from "../../components/newsScreen/MoreNewsSection";
import LatestReleasesSection from "../../components/newsScreen/LatestReleasesSection";
import styles from "../../styles/more_screens/NewsCardStyles";
import { PRESS_RELEASES, NEWSLETTERS } from "../../constants/NewsConstants";
import TouchableOpacitiesSection from "../../components/TouchableOpacitiesSection";
import { splitArrayItems } from "../../common/array_utilities/splitArrayItems";
import { READ_MORE_NEWS_ROUTE } from "../../constants/routes";
import { IRootReducerType } from "../../redux/reducers";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Auth } from "aws-amplify";
import Back from "../../components/BackIcon";
import valueOrDefault from "../../common/valueOrDefault";

const NewsScreen = () => {
  const theme = useTheme();
  const [newsType, setType] = useState<NewsType>(PRESS_RELEASES);
  const navigation = useNavigation();
  const news = useSelector<IRootReducerType, News | undefined>(
    ({ newsDetails }) => newsDetails.news
  );

  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ newsDetails }) => newsDetails.loader
  );

  useLayoutEffect(() => {
    Auth.currentUserInfo().then((user) => {
      if (user) {
        setIsUserLoggedIn(true);
        setType(PRESS_RELEASES);
        navigation.setOptions({
          headerLeft: () => <Back goBack={true} />,
          headerRight: () => <View />,
          title: "News",
        });
      } else {
        setIsUserLoggedIn(false);
        setType(PRESS_RELEASES);
        navigation.setOptions({
          headerShown: false,
        });
      }
    });
  }, [navigation]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(setRefreshingNews(true));
    dispatch(getAllNews());
  };

  const handleNewsType = (type: NewsType) => setType(type);

  const moreNews = (releases: any[], letters: any[]) => {
    return newsType === PRESS_RELEASES
      ? releases.map((item, key) => (
          <MoreNewsSection
            key={key}
            newItemType={PRESS_RELEASES}
            title={item.title}
            summary={item.summary}
            navigate={
              navigation.navigate as (arg1: unknown, arg2?: unknown) => void
            }
            newItem={item}
          />
        ))
      : letters.map((item, key) => (
          <MoreNewsSection
            key={key}
            newItemType={NEWSLETTERS}
            title={item.title}
            summary={item.summary}
            navigate={
              navigation.navigate as (arg1: unknown, arg2?: unknown) => void
            }
            newItem={item}
          />
        ));
  };

  const pressReleases = valueOrDefault(
    news?.pressReleases,
    []
  ) as PressReleases[];
  const newsletters = valueOrDefault(news?.newsletters, []) as Newsletters[];
  const { latestItems, otherItems } = isUserLoggedIn
    ? splitArrayItems(pressReleases, 3)
    : { otherItems: pressReleases, latestItems: [] };

  return (
    <ScrollView
      testID={"scrollview"}
      contentContainerStyle={styles.scrollViewContentContainer}
      style={styles.flexView}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      {isUserLoggedIn ? (
        <LatestReleasesSection
          items={latestItems}
          navigate={navigation.navigate}
          route={READ_MORE_NEWS_ROUTE}
        />
      ) : (
        <View />
      )}
      <View style={styles.flexView}>
        <View style={styles.opacitiesContainer}>
          <TouchableOpacitiesSection
            handleSelectedOption={handleNewsType as (arg: unknown) => void}
            selectedOptionFromProps={newsType}
            firstOption={PRESS_RELEASES}
            firstOptionLabel={"Press releases"}
            secondOption={NEWSLETTERS}
            secondOptionLabel={"Newsletters"}
            backgroundColor={theme.colors.background}
            fontColor={theme.colors.newAquaMarineColor}
            fontWeight={"bold"}
          />
        </View>
        <View style={styles.flexView}>{moreNews(otherItems, newsletters)}</View>
      </View>
      <View style={styles.endOfScrollView} />
    </ScrollView>
  );
};

export default NewsScreen;
