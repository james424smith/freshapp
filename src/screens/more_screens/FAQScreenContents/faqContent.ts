const email = "mailto:feedback.app@marlowgroup.com";

export const assignmentContent = [
  {
    id: 0,
    question: "I cannot see my flights / details of next assignment?",
    answer:
      "Please contact your local manning agency or crew manager.  They will update your database file and then you will see these changes in the App.",
    opened: false,
  },
  {
    id: 1,
    question: "I cannot see previous payroll / working clothes records?",
    answer:
      "Presently the App only shows these records for your present / current assignment.  Historical records are not shown",
    opened: false,
  },
  {
    id: 2,
    question: "How do I see the location of the vessel I am joining?",
    answer:
      "Go to the ‘Assignment screen’ and click on the map icon (top right)",
    opened: false,
  },
];

export const generalContent = [
  {
    id: 0,
    question: "I have a suggestion to improve the App",
    answer:
      "We are happy to hear all feedback. Please contact our support team for further assistance (feedback.app@marlowgroup.com) or through our support page in our application.",
    opened: false,
    url: email,
  },
  {
    id: 1,
    question: "Where do I see Marlow's job openings? Can I apply online?",
    answer:
      "You can always visit the link below to see Marlow's open vacancies and follow the application procedures. \n  https://marlow-navigation.com/en/marlow-careers.asp'",
    opened: false,
    url: "https://marlow-navigation.com/en/marlow-careers.asp",
  },
];

export const loginAndPasswordContent = [
  {
    id: 0,
    question: "The temporary password I received by email does not work",
    answer:
      "Firstly, you need to ensure that all 8 characters are copied / pasted. \n\nSecondly, the temp password is only valid for 14 days after issuance. \n\nIf the password has expired please contact our support team for further assistance (feedback.app@marlowgroup.com). \n\nThey will reset you account in order that you can start the process again from the beginning. ",
    opened: false,
    url: email,
  },
  {
    id: 1,
    question: "I cannot create a personal password. It is not accepted.",
    answer:
      "Please enter your own password twice ensuring that: \n a. It is a least 8 characters  \n b. It contains one capital letter  \n c. It contains one symbol (!@#$%^&*) \n d. Both entries are identical",
    opened: false,
  },
  {
    id: 2,
    question: "I have forgotten my personal password",
    answer:
      "Please use the ‘Forgot Password’ option on the login page. You will then receive an email with further guidance",
    opened: false,
  },
  {
    id: 3,
    question:
      "I used the ‘Forgot Password’ option but did not receive an email",
    answer:
      "Please contact our support team for further assistance (feedback.app@marlowgroup.com)",
    opened: false,
    url: email,
  },
  {
    id: 4,
    question: "How can I enable biometric login (finger print / face ID)?",
    answer:
      "a. You need to login into the application using your credentials. \nb. Set your security passcode \nc. Select More from the menu bar. \nd. Select the Settings tab. \ne. Swipe button to the right to Enable Biometrics. \nf. Use biometric confirmation to enable this feature. \n Please note that Biometric security settings should be configured on your smartphone to be able to activate on the application.",

    opened: false,
  },
];

export const personalInfoContent = [
  {
    id: 0,
    question: "Is my Crew Portal and CrewCompanion account linked?",
    answer:
      "a. No. Both systems are separate for each other.  For both systems you firstly need to register and create a personal password \n\nb. Crew Portal Registration guide",
    opened: false,
  },
  {
    id: 1,
    question: "The details in my account are not correct / need updating?",
    answer:
      "Please contact your local manning agency or crew manager.  They will update your database file and then you will see these changes in the App.",
    opened: false,
  },
  {
    id: 2,
    question: "I cannot see previous payroll / working clothes records?",
    answer:
      "Yes. For each document entry you will see switch.  Slide this switch from left to right.  The switch will change to blue.  The image of the document has been download and can be viewed in the App when offline.",
    opened: false,
  },
];

export const registrationContent = [
  {
    id: 0,
    question:
      "I am trying to create an account and I receive a message that my email address does not match the entry in my file.",
    answer:
      "Please contact your local manning agency or crew manager. They will update the email address in your database file.",
    opened: false,
  },
  {
    id: 1,
    question:
      "During registration I did not receive an email with the subject “Your Marlow CrewCompanion Account Registration”",
    answer:
      "Please also check Spam and Deleted items folders in case the email was automatically filed in these locations. If you still cannot find the mail please contact our Support Team (feedback.app@marlowgroup.com)",
    opened: false,
    url: email,
  },
];

export const technicalContant = [
  {
    id: 0,
    question: "How do I update the App?",
    answer:
      "a. Android users can update via the Google Play store. \nb. iOS users can update by downloading the installation file via the Marlow Crew Portal",
    opened: false,
  },
  {
    id: 1,
    question: "I cannot see anyone in the Chat feature? ",
    answer:
      "a. Please make sure that you have enabled GPS / location services in the settings screen \n\nb. Please make sure you have activated the service for the required time (30 mins to 5.5 hours) \n\nc. Please note that you will only be able to view other Marlow seafarers that have activated the chat feature and are within 30km radius range",
    opened: false,
  },
  {
    id: 2,
    question: "I have an iPhone. Why can’t I download via the Apple App Store?",
    answer:
      "Apple do not allow Apps for internal employees to be listed in their store. You can download and install the App via the Marlow Crew Portal",
    opened: false,
  },
  {
    id: 3,
    question: "I have an iPhone. How do I enable ‘dark mode’ for the App?",
    answer: "Go to ‘settings’ and then ‘display and brightness’",
    opened: false,
  },
  {
    id: 4,
    question: "How can I enable biometric login (finger print / face ID)?",
    answer:
      "a. You need to login into the application using your credentials. \nb. Set your security passcode \nc. Select More from the menu bar. \nd. Select the Settings tab. \ne. Swipe button to the right to Enable Biometrics.\nf. Use biometric confirmation to enable this feature. \n Please note that Biometric security settings should be configured on your smartphone to be able to activate on the application.",

    opened: false,
  },
  {
    id: 5,
    question:
      "I cannot share my documents on my Huawei/Xiaomi device. What can I do?",
    answer:
      "a. Go to Settings -> Apps \nb. Select Default apps \nc. Go to More defaults. \nd. Select Gallery. \ne. Swipe button to the right to Enable Biometrics. \nf. Use biometric confirmation to enable this feature. \n Please note that Biometric security settings should be configured on your smartphone to be able to activate on the application.",
    opened: false,
  },
];
