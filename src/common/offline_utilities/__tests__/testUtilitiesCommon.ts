import AsyncStorage from "@react-native-community/async-storage";

export const mockAsyncStorageGetItem = (output: Record<never, never>) =>
  (AsyncStorage.getItem = jest.fn().mockImplementation(() => {
    return Promise.resolve(JSON.stringify(output));
  }));

export const mockAsyncStorageSetItem = (input: Record<never, never>) =>
  (AsyncStorage.setItem = jest.fn().mockImplementation(() => {
    return Promise.resolve(JSON.stringify(input));
  }));

describe("tests that the mocks are working properly", () => {
  it("should run without errors", () => {
    expect(mockAsyncStorageGetItem({ someKey: "some value" })).toBeTruthy();
    expect(mockAsyncStorageSetItem({ someKey: "some value" })).toBeTruthy();
  });
});
