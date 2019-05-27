import { AsyncStorage } from 'react-native';


function NativeStorage(name: string, prefix: string) {
    const prefixKey = name + "-" + prefix + ".";
    return {
        purge: () => {
            AsyncStorage.getAllKeys().then((keys: Array<string>) =>
                AsyncStorage.multiRemove(keys.filter((key => key.startsWith(prefixKey)))));
        },
        restore: (): Promise<Map<string, Object>> => {
            return AsyncStorage.getAllKeys().then((keys: Array<string>) =>
                AsyncStorage.multiGet(keys.filter((key => key.startsWith(prefixKey)))).then((data: Array<Array<string>>): Map<string, Object> => {
                    const result: Map<string, Object> = new Map();
                    for (var i = 0; i < data.length; i++) {
                        const item = data[i];
                        const key = item[0];
                        result.set(key.slice(prefixKey.length), item[1]);
                    }
                    return result;
                }));
        },
        setItem: (key: string, item: string): Promise<void> => {
            return AsyncStorage.setItem(prefixKey+key, item);
        },
        removeItem: (key: string): Promise<void> => {
            return AsyncStorage.removeItem(prefixKey+key);
        },
    }
}

export default NativeStorage;