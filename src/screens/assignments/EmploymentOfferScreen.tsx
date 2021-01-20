import React from "react";
import { ScrollView } from "react-native";
import PdfRender from "../../components/PdfRender";
import styles from "../../styles/assignments/EmploymentOfferStyles";
import { useSelector } from "react-redux";
import { IRootReducerType } from "../../redux/reducers";
import { AssignmentStackParamList } from "../../navigation/MainTabNavigator";
import { RouteProp } from "@react-navigation/native";
import { CURRENT } from "../../constants/assignmentConstants";
interface Props {
  route: RouteProp<AssignmentStackParamList, "EmploymentOffer">;
}
const EmploymentOfferScreen = (props: Props) => {
  const { route } = props;
  const assignmentType = route.params?.assignmentType;
  const currentEmploymentOffer = useSelector<
    IRootReducerType,
    string | undefined
  >(
    ({ assignmentDetails }) =>
      (assignmentDetails.assignmentDetails || [])[0]?.employmentOfferDocument
        ?.document
  );
  const nextEmploymentOffer = useSelector<IRootReducerType, string | undefined>(
    ({ assignmentDetails }) =>
      (assignmentDetails.assignmentDetails || [])[1]?.employmentOfferDocument
        ?.document
  );

  const employmentOfferDocument =
    assignmentType === CURRENT ? currentEmploymentOffer : nextEmploymentOffer;
  const pdf = employmentOfferDocument;
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {(pdf && <PdfRender document={pdf} resourceType={"base64"} />) ||
        undefined}
    </ScrollView>
  );
};

export default EmploymentOfferScreen;
