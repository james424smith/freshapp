import React, { useState, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getContactDetails,
  setRefreshingContactDetails,
} from "../../redux/actions";
import {
  CREW_MANAGER,
  PORT_AGENT,
  MANNING_AGENT,
} from "../../constants/contactConstants";
import { ContactType, Contact } from "../../interfaces";
import ContactScreenTopMenu from "../../components/contact/ContactScreenTopMenu";
import CrewManagerContactDetails from "../../components/contact/CrewManagerContactDetails";
import ManningAgentContactDetails from "../../components/contact/ManningAgentContactDetails";
import PortAgentContactDetails from "../../components/contact/PortAgentContactDetails";
import styles from "../../styles/more_screens/ContactsStyles";

import { IRootReducerType } from "../../redux/reducers";

const ContactScreen = () => {
  const [selectedType, setSelectedType] = useState<ContactType>(CREW_MANAGER);

  const contacts = useSelector<IRootReducerType, Contact>(
    ({ contactDetails }) => contactDetails.contactDetails
  );
  const isLoading = useSelector<IRootReducerType, boolean>(
    ({ contactDetails }) => contactDetails.loader
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactDetails());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(setRefreshingContactDetails(true));
    dispatch(getContactDetails());
  };

  const handleSelection = (type: ContactType) => {
    setSelectedType(type);
  };

  const renderSelectedContactDetails = (selectedOption: string) => {
    switch (selectedOption) {
      case CREW_MANAGER:
        return (
          <CrewManagerContactDetails
            crewingManagerDetails={contacts?.crewingManager?.crewingManager}
            photoSmall={contacts?.crewingManager?.photoSmall}
          />
        );
      case MANNING_AGENT:
        return (
          <ManningAgentContactDetails
            manningAgentDetails={contacts?.manningAgent}
          />
        );
      case PORT_AGENT:
        return (
          <PortAgentContactDetails portAgentDetails={contacts?.portAgent} />
        );
      default:
        throw Error("Component path not found");
    }
  };
  return (
    <ScrollView
      testID={"scrollview"}
      style={styles.root}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <ContactScreenTopMenu
        handleSelection={handleSelection}
        selectedType={selectedType}
      />
      <ScrollView style={styles.scrollViewContainer}>
        {renderSelectedContactDetails(selectedType)}
      </ScrollView>
    </ScrollView>
  );
};

export default ContactScreen;
