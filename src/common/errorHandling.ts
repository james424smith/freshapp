export default (errorCode?: string) => {
  switch (errorCode) {
    case "NetworkError":
      return "You are offline. Please check your internet connection.";
    case "signUpOracle":
      return "Email address entered does not match our records. In order to proceed with registration please either enter a different email address or contact our Support Team (feedback.app@marlowgroup.com) in order to update your records. Please always include your Marlow ID when contacting our Support Team.";
    case "signUpAws":
      return "There is a problem. Seems you already started or completed the registration process. You need to go back to the main screen and login with your Marlow ID and password. If you did not create a personal password yet then please check your email account for the temp password.";
    case "UserNotFoundException":
      return "Please make sure your Employee Id and/or password are correct.";
    case "Login":
      return "There is a problem. Did you already create an account? If not, please select the 'Create New Account' option and then copy / paste the password from the email. If you already created an account please ensure you are entering the correct Marlow ID and personal password. If you don't remember your personal password please use the 'Forgot Password' option";
    case "ForgotPassword":
      return "A verification code has been sent to the registered email of the provided Employee ID. Please use this code to reset your password.";
    default:
      return "There is a problem. Did you already create an account? If not, please select the 'Create New Account' option and then copy / paste the password from the email. If you already created an account please ensure you are entering the correct Marlow ID and personal password. If you don't remember your personal password please use the 'Forgot Password' option";
  }
};
