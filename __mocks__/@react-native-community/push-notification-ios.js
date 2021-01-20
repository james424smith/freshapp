export default {
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(() => Promise.resolve()),
  getInitialNotification: jest.fn(() => Promise.resolve()),
  // getInitialNotification: jest.fn(() =>
  //   Promise.resolve({
  //     _data: {
  //       data: {
  //         jsonBody: { notificationCategory: "someValue" },
  //       },
  //     },
  //   })
  // ),
};
