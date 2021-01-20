import AwsCustomStorage from "./AwsCustomStorage";
describe("test the AwsCustomStorage class", () => {
  const setter = "Some Value";
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("createSyncPromise should succeed", async () => {
    await AwsCustomStorage.createSyncPromise();

    expect(AwsCustomStorage.memoryData).toStrictEqual({
      temp: "temp",
      temp2: "temp",
    });
  });

  it("should set and get the correct data", async () => {
    await AwsCustomStorage.setItem("value", setter);
    const getter = AwsCustomStorage.getItem("value");
    expect(getter).toBe(setter);
  });

  it("getItem should return null if it is not present in the store", () => {
    const value2 = AwsCustomStorage.getItem("value2");
    expect(value2).toBe(null);
  });

  it("removeItem should return succeed", async () => {
    await AwsCustomStorage.setItem("value", setter);
    await AwsCustomStorage.removeItem("value");
    const value2 = AwsCustomStorage.getItem("value");

    expect(value2).toBe(null);
  });

  it("removeItem should call console.info if you are trying to remove an item that does not exist", async () => {
    console.info = jest.fn();
    await AwsCustomStorage.removeItem("value3");
    expect(console.info).toBeCalledTimes(1);
  });

  it("should call createSyncPromise when syncPromise is undefined", async () => {
    AwsCustomStorage.createSyncPromise = jest.fn();
    AwsCustomStorage.syncPromise = undefined;
    await AwsCustomStorage.sync();

    expect(AwsCustomStorage.createSyncPromise).toHaveBeenCalledTimes(1);
  });
  it("should call createSyncPromise when syncPromise is defined", async () => {
    AwsCustomStorage.createSyncPromise = jest.fn();

    AwsCustomStorage.syncPromise = (true as unknown) as void;

    await AwsCustomStorage.sync();
    expect(AwsCustomStorage.createSyncPromise).toHaveBeenCalledTimes(0);
    expect(AwsCustomStorage.syncPromise).toBeTruthy();
  });

  it("should call conaole.log when a call failed in multiGet", async () => {
    const keys = ["@MemoryStorage:temp", "temp3"];
    console.log = jest.fn();
    await AwsCustomStorage.multiGet(keys, "remove");

    expect(console.log).toHaveBeenCalledTimes(1);
  });
  it("should call conaole.log when a call failed in setItem", async () => {
    console.info = jest.fn();
    await AwsCustomStorage.setItem("temp", (undefined as unknown) as string);

    expect(console.info).toHaveBeenCalledTimes(1);
  });

  it("should remove multiple items from the store", async () => {
    AwsCustomStorage.setItem("value", setter);
    AwsCustomStorage.setItem("value2", setter);

    await AwsCustomStorage.clear();

    const getter1 = AwsCustomStorage.getItem("value");
    const getter2 = AwsCustomStorage.getItem("value2");

    expect(getter1).toBe(null);
    expect(getter2).toBe(null);
  });
});
