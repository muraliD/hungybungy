import AsyncStorage from '@react-native-async-storage/async-storage';
class LocalStorage {
  /**
   *
   * @param key
   */
  async retrieveData(key) {
    try {
      let value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {}
  }
  /**
   *
   * @param key
   * @param value
   */
  async storeData(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {}
  }
}

export default class AsyncStorageManager {
  static localStorage = new LocalStorage();
  static LOCAL_KEYS;
}

export const LOCAL_KEYS = {
  IS_TUTORIAL_SHOWN: 'IS_TUTORIAL_SHOWN',
  USER_DATA: 'USER_DATA',
  SELECTED_LOCATION: 'SELECTED_LOCATION',
};
