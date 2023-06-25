import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
}

export async function getStoredString(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
}

export async function removeStoredString(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
}
