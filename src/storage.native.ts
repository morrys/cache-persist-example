import { AsyncStorage } from 'react-native';


const NativeStorage = {
    purge: () => AsyncStorage.clear(),
    restore: (): Promise<Map<string, Object>> => {
        return AsyncStorage.getAllKeys().then((keys: Array<string>) =>
            AsyncStorage.multiGet(keys).then((data: Array<Array<string>>): Map<string, Object> => {
                const result: Map<string, Object> = new Map();
                for (var i = 0; i < data.length; i++) {
                    const item = data[i];
                    result.set(item[0], item[1]);
                }
                return result;
            }));
    },
    setItem: (key: string, item: string): Promise<void> => {
        return AsyncStorage.setItem(key, item);
    },
    removeItem: (key: string): Promise<void> => {
        return AsyncStorage.removeItem(key);
    },
}

export default NativeStorage;