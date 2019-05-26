import storage from "./storage";


class Cache {
    data: Map<string, Object> = new Map();
    rehydrated: boolean = false;
    serialize: boolean = true;

    constructor(serialize: boolean = true) { //TODO custom storage
        this.serialize = serialize;
    }

    restore(): void {
        storage.restore().then(result => {
            this.data = result;
            this.rehydrated = true;
        });
    }

    purge(): void {
        this.data = new Map();
        storage.purge();
    }

    get(key: string): any {
        return this.data.get(key);
    }

    set(key: string, value: any): Promise<any> {
        //if (!key) return handleError('set', 'a key');

        this.data.set(key, value);
        return storage.setItem(key, this.serialize ? JSON.stringify(value) : value);
    }

    remove(key: string): Promise<any> {
        //if (!key) return handleError('remove', 'a key');

        this.data.delete(key);
        return storage.removeItem(key);
    }

    getAllKeys(): Array<string> {
        return Array.from(this.data.keys());
    }
}

export default Cache;