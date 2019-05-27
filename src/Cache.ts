import createStorage from "./storage";


class Cache {
    data: Map<string, Object> = new Map();
    rehydrated: boolean = false;
    serialize: boolean = true;
    prefix: string = "cache-persist:";
    storage: any;

    constructor(options :{createStorage?: (name: string, prefix: string) => any, name?: string, prefix?: string, serialize?: boolean} = {}) { //TODO custom storage
        options = {
            createStorage: createStorage,
            name: 'cache',
            prefix: 'persist',
            serialize: true,
            ...options,
        }
        this.serialize = options.serialize;
        this.storage = options.createStorage(options.name, options.prefix)
    }

    restore(): Promise<Cache> {
        return new Promise((resolve, reject) => {
            this.storage.restore().then(result => {
                this.data = result;
                this.rehydrated = true;
                resolve(this)
            }).catch(e => reject(e));
        })
        
    }

    purge(): void {
        this.data = new Map();
        this.storage.purge();
    }

    get(key: string): any {
        return this.data.get(key);
    }

    set(key: string, value: any): Promise<any> {
        //if (!key) return handleError('set', 'a key');

        this.data.set(key, value);
        return this.storage.setItem(key, this.serialize ? JSON.stringify(value) : value);
    }

    remove(key: string): Promise<any> {
        //if (!key) return handleError('remove', 'a key');

        this.data.delete(key);
        return this.storage.removeItem(key);
    }

    getAllKeys(): Array<string> {
        return Array.from(this.data.keys());
    }
}

export default Cache;