import { openDB, DBSchema } from 'idb';


function createIdbStorage(name: string, prefix: string) {
    /** @var {Object} */
    const options = {
        /** Database name */
        name: name || 'PersistDB',
        /** Store name */
        storeName: prefix || 'cache',
        /** Database version */
        version: 1,
        /** Upgrade callback. Useful when for example switching storeName */
        upgradeCallback: upgradeDb => upgradeDb.createObjectStore(options.storeName),
    }

    //const namee:string = options.storeName;

    /*interface CacheDB extends DBSchema {
        [namee]: {
            id: string,
            key: string,
            value: {
                record: any,
                id: string
            },
        },
    }*/

    /** @var {Promise} */
    const dbPromise = openDB<any>(options.name, options.version, {
        upgrade(dbPromise) {
            dbPromise.createObjectStore(options.storeName);
        }
    })


    return {
        purge: () => {
            dbPromise.then(db => db.clear(options.storeName));
            
        },
        restore: (): Promise<Map<string, Object>> => {
            return dbPromise.then(db =>
                db.getAllKeys(options.storeName).then(async keys => {
                    const result: Map<string, Object> = new Map();
                    for (var i = 0; i < keys.length; i++) {
                        const value = await db.get(options.storeName, keys[i]);
                        result.set(""+keys[i], value);
                    }
                    return result;
                })
            );
        },
        setItem: (key: string, item: object): Promise<any> => {
            return dbPromise.then(db =>
                db.put(options.storeName, item, key))
        },
        removeItem: (key: string): Promise<void> => {
            return dbPromise.then(db =>
                db.delete(options.storeName, key) )
        },
    }
}

export default createIdbStorage;