// AsyncStorageUtils.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const loadGameCount = async () => {
  try {
    const count = await AsyncStorage.getItem('gameCount');
    if (count !== null) {
      return JSON.parse(count);
    }
    return null;
  } catch (error) {
    console.log('Error loading game count:', error);
    return null;
  }
};

const saveGameCount = async (gameCount: number) => {
  try {
    await AsyncStorage.setItem('gameCount', JSON.stringify(gameCount));
  } catch (error) {
    console.log('Error saving game count:', error);
  }
};

export { loadGameCount, saveGameCount };
