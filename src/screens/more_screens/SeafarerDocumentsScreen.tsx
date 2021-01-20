import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ScrollView, RefreshControl } from "react-native";
import _ from "lodash";
import {
  getSeafarerDocuments,
  setRefreshingSeafarerDocuments,
} from "../../redux/actions";
import styles from "../../styles/more_screens/SeafarerDocumentationStyles";
import { Document, Categories, SeafarerDocuments } from "../../interfaces";
import SeafarerDocumentsTopBar from "../../components/seafarerDocuments/SeafarerDocumentsTopBar";
import SeafarerDocumentsRenderSection from "../../components/seafarerDocuments/SeafarerDocumentsRenderSection";

import { IRootReducerType } from "../../redux/reducers";
import { useNavigation } from "@react-navigation/native";
import valueOrDefault from "../../common/valueOrDefault";

const SeafarerDocumentsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigation = useNavigation();
  const categories = useSelector<IRootReducerType, Categories[] | undefined>(
    ({ seafarerDocuments }) => seafarerDocuments.seafarerDocuments?.categories
  );
  const documents = useSelector<
    IRootReducerType,
    SeafarerDocuments | undefined
  >(({ seafarerDocuments }) => seafarerDocuments.seafarerDocuments?.documents);
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ seafarerDocuments }) => seafarerDocuments.loader
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSeafarerDocuments());
  }, [dispatch]);

  useEffect(() => {
    if (!_.isEmpty(categories)) {
      const cat = (valueOrDefault(categories, []) as Categories[]).sort(
        (a: Categories, b: Categories) => Number(a.orderNo) - Number(b.orderNo)
      );
      const selectedCategoryNew = cat[0].id;
      !selectedCategory && setSelectedCategory(selectedCategoryNew);
    }
  }, [categories, selectedCategory]);

  const chooseDataToUse = () => {
    return selectedCategory
      ? (valueOrDefault(
          (valueOrDefault(documents, {}) as SeafarerDocuments)[
            selectedCategory
          ],
          []
        ) as Document[])
      : (valueOrDefault(_.values(documents)[0], []) as Document[]);
  };

  const handleDocumentsToShow = (category: string) => {
    setSelectedCategory(category);
  };

  const seafarerDocumentsTopBar = () => {
    return (
      (valueOrDefault(categories, []) as Categories[]).length > 0 && (
        <SeafarerDocumentsTopBar
          categories={categories}
          handleDocumentsToShow={handleDocumentsToShow}
          selectedCategory={selectedCategory}
        />
      )
    );
  };

  const handleRefresh = () => {
    dispatch(setRefreshingSeafarerDocuments(true));
    dispatch(getSeafarerDocuments());
  };

  const dataToUse = chooseDataToUse();
  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.root}
      contentContainerStyle={styles.makeFlexGrow}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      {selectedCategory ? (
        <View>
          <View>{seafarerDocumentsTopBar()}</View>
          <ScrollView style={styles.makeFlexGrow}>
            {dataToUse.length > 0 &&
              dataToUse.map((document: Document, key: number) => (
                <SeafarerDocumentsRenderSection
                  key={key}
                  documentDetails={document}
                  navigate={
                    navigation.navigate as (arg1: string, arg2: unknown) => void
                  }
                />
              ))}
            <View style={styles.endSpace} />
          </ScrollView>
        </View>
      ) : (
        <View />
      )}
    </ScrollView>
  );
};

export default SeafarerDocumentsScreen;
