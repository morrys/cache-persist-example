function noop() { }
let noopStorage = {
    clear: noop,
    key: noop,
    getItem: noop,
    setItem: noop,
    removeItem: noop,
    length: 0
}

function hasStorage(storageType) {
    if (typeof self !== 'object' || !(storageType in self)) {
        return false
    }

    try {
        let storage = self[storageType]
        const testKey = `cache-persist ${storageType} test`
        storage.setItem(testKey, 'test')
        storage.getItem(testKey)
        storage.removeItem(testKey)
    } catch (e) {
        return false
    }
    return true
}

function getStorage(type: string): any {
    const storageType = `${type}Storage`
    if (hasStorage(storageType)) return self[storageType]
    else {
        return noopStorage;
    }
}
let storage = getStorage('local')
function webStorage(name: string, prefix: string) {
    const prefixKey = name+"-"+prefix+".";
    return {
        purge: () => {
            for (var i = 0; i < storage.length; i++) {
                const key: string = storage.key(i);
                if (key.startsWith(prefixKey)) {
                    storage.removeItem(key);
                }
            }
        },
        restore: (): Promise<Map<string, Object>> => {
            return new Promise((resolve, reject) => {
                const data: Map<string, Object> = new Map();
                for (var i = 0; i < storage.length; i++) {
                    const key: string = storage.key(i);
                    if (key.startsWith(prefixKey))
                        data.set(key.slice(prefixKey.length), storage.getItem(key));
                }
                resolve(data)
            })
        },
        setItem: (key: string, item: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                resolve(storage.setItem(prefixKey+key, item))
            })
        },
        removeItem: (key: string): Promise<void> => {
            return new Promise((resolve, reject) => {
                resolve(storage.removeItem(prefixKey+key))
            })
        },
    }
}

export default webStorage;