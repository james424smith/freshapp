import { Alert } from "react-native";

type Props = {
  handleClick: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

const confirmationButtonText = "Yes";
const rejectionButtonText = "No";

/**If toggle switch pressed, alert message pops up to.
 * Yes: Will download the document locally for offline use.
 **/

const alert = (props: Props) => {
  const { handleClick, title, message, confirmText, cancelText } = props;
  return Alert.alert(
    title,
    message,
    [
      {
        text: confirmText ?? confirmationButtonText,
        onPress: () => handleClick(),
      },
      {
        text: cancelText ?? rejectionButtonText,
        style: "cancel",
      },
    ],
    { cancelable: true }
  );
};

export default alert;
