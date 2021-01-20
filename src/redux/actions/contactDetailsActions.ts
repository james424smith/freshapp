import {
  GET_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_FAIL,
  GET_CONTACT_DETAILS_SUCCESS,
  SET_REFRESHING_CONTACT_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  Contact,
  SuccessAction,
  FailedAction,
} from "../../interfaces";

export function getContactDetails(): InitialisedSagaCall {
  return { type: GET_CONTACT_DETAILS };
}

export function setRefreshingContactDetails(
  isLoading: boolean
): InitialisedSagaCall {
  return { type: SET_REFRESHING_CONTACT_DETAILS, payload: isLoading };
}

export const getContactDetailsSuccess = (
  contactDetails: Contact
): SuccessAction<Contact> => ({
  type: GET_CONTACT_DETAILS_SUCCESS,
  payload: contactDetails,
});

export const getContactDetailsFailed = (error: any): FailedAction => ({
  type: GET_CONTACT_DETAILS_FAIL,
  error,
});
