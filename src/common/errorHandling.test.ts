import errorHandling from "./errorHandling";

describe("should return the aprropriate message based on the error", () => {
  it("should return message when the error is NetworkError", () => {
    const result = errorHandling("NetworkError");

    expect(result).toBe(
      "You are offline. Please check your internet connection."
    );
  });
  it("should return message when the error is signUpOracle", () => {
    const result = errorHandling("signUpOracle");

    expect(result).toBe(
      "Email address entered does not match our records. In order to proceed with registration please either enter a different email address or contact our Support Team (feedback.app@marlowgroup.com) in order to update your records. Please always include your Marlow ID when contacting our Support Team."
    );
  });
  it("should return message when the error is signUpAws", () => {
    const result = errorHandling("signUpAws");

    expect(result).toBe(
      "There is a problem. Seems you already started or completed the registration process. You need to go back to the main screen and login with your Marlow ID and password. If you did not create a personal password yet then please check your email account for the temp password."
    );
  });
  it("should return message when the error is UserNotFoundException", () => {
    const result = errorHandling("UserNotFoundException");

    expect(result).toBe(
      "Please make sure your Employee Id and/or password are correct."
    );
  });
  it("should return message when the error is Login", () => {
    const result = errorHandling("Login");

    expect(result).toBe(
      "There is a problem. Did you already create an account? If not, please select the 'Create New Account' option and then copy / paste the password from the email. If you already created an account please ensure you are entering the correct Marlow ID and personal password. If you don't remember your personal password please use the 'Forgot Password' option"
    );
  });
  it("should return message when the error is ForgotPassword", () => {
    const result = errorHandling("ForgotPassword");

    expect(result).toBe(
      "A verification code has been sent to the registered email of the provided Employee ID. Please use this code to reset your password."
    );
  });
  it("should return message when the error is undefined", () => {
    const result = errorHandling();

    expect(result).toBe(
      "There is a problem. Did you already create an account? If not, please select the 'Create New Account' option and then copy / paste the password from the email. If you already created an account please ensure you are entering the correct Marlow ID and personal password. If you don't remember your personal password please use the 'Forgot Password' option"
    );
  });
});
