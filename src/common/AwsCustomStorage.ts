import Keychain from "react-native-secure-storage";
const memoryKeyPrefix = "@MemoryStorage:";

interface MemoryData {
  [key: string]: string;
}
async function handleItemInKeychain(
  key: string,
  method: string,
  value?: string
) {
  try {
    if (method === "get") {
      return Keychain.getItem(key);
    } else if (method === "remove") {
      return Keychain.removeItem(key);
    } else {
      return Keychain.setItem(key, value);
    }
  } catch (error) {
    throw Error(error);
  }
}

export default class AmplifyCommunityAsyncStorage {
  static memoryData: MemoryData = {};

  static multiGet = async function (keys: string[], type: string) {
    return Promise.all(
      keys.map(async (key) => {
        await new Promise((res) => setTimeout(res, 100)); // sleep for 100ms
        return [
          key,
          await handleItemInKeychain(key, type).catch((error) =>
            console.log(`Error while trying ${type} for ${key}`, error)
          ),
        ];
      })
    );
  };

  static syncPromise: void | undefined;
  static setItem = async (key: string, value: string) => {
    try {
      await handleItemInKeychain(`${memoryKeyPrefix}${key}`, "set", value);
    } catch (error) {
      console.info(`Failed to set item ${key} in AsyncStorage: ${error}`);
    }
    AmplifyCommunityAsyncStorage.memoryData[key] = value;
    return value;
  };
  static getItem = (key: string) => {
    const value = AmplifyCommunityAsyncStorage.memoryData[key];
    return value === undefined ? null : value;
  };

  static removeItem = async (key: string) => {
    try {
      await handleItemInKeychain(`${memoryKeyPrefix}${key}`, "remove");
      delete AmplifyCommunityAsyncStorage.memoryData[key];
    } catch (error) {
      console.info(`Failed to remove item ${key} in AsyncStorage: ${error}`);
    }
  };
  static clear = async () => {
    const keys = await Keychain.getAllKeys();
    const memoryKeys = keys.filter((key: string) =>
      key.startsWith(memoryKeyPrefix)
    );
    await AmplifyCommunityAsyncStorage.multiGet(memoryKeys, "remove");
    AmplifyCommunityAsyncStorage.memoryData = {};
  };
  static createSyncPromise = async (_temp?: string) => {
    AmplifyCommunityAsyncStorage.memoryData = {};
    const keys = await Keychain.getAllKeys();
    const memoryKeys = keys.filter((key: string) =>
      key.startsWith(memoryKeyPrefix)
    );
    const pairs = await AmplifyCommunityAsyncStorage.multiGet(
      memoryKeys,
      "get"
    );
    pairs.forEach(([memoryKey, value]) => {
      if (value) {
        const key = (memoryKey as string).replace(memoryKeyPrefix, "");
        AmplifyCommunityAsyncStorage.memoryData[key] = value;
      }
    });
  };

  static sync = async () => {
    console.log(AmplifyCommunityAsyncStorage.syncPromise);
    if (!AmplifyCommunityAsyncStorage.syncPromise) {
      AmplifyCommunityAsyncStorage.syncPromise = await AmplifyCommunityAsyncStorage.createSyncPromise();
    }
    return AmplifyCommunityAsyncStorage.syncPromise;
  };
}
