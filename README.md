# cache-persist
cache-persist


## Installation

Install cache-persist using yarn or npm:

```
yarn add cache-persist
```

## Options
CacheOptions {
    createStorage?: (name: string, prefix: string) => CacheStorage, 
    name?: string, 
    prefix?: string, 
    serialize?: boolean
}

createStorage: in order to create a custom storage
the keys of the values saved in the storage are so composed: name + "-" + prefix + "."
serialize: if it is true, the data will be serialized and deserialized JSON 

## Cache
isRehydrated(): boolean; // true if restored
restore(): Promise<Cache>; // restore storage, set rehydratad
getStorageName(): string;  // storage name
purge(): void; // purge state and storage
getState(): Readonly<{v[key: string]: any; }>; // return in memory state
get(key: string): any; // get value from in memory state
getAllKeys(): Array<string>; // getAllKeys value from in memory state
set(key: string, value: any): Promise<any>; // set value in state (sync) and in storage (async)
delete(key: string): Promise<any>; // delete value in state (sync) and in storage (async)
remove(key: string): Promise<any>; // remove value in state (sync) and in storage (async)


## Usage default
```ts
import { Cache } from "cache-persist";
const cache = new Cache();
cache.restore().then(() => {
    const state = cache.getState();
});
```

## Usage indexedDB

```ts
import { Cache } from "cache-persist";
import createIdbStorage from 'cache-persist/lib/idbstorage';

const optionIDBnew: CacheOptions = {
        createStorage: createIdbStorage,
        name: 'persistnew',
        serialize: false,
    }

const cache = new Cache(optionIDBnew);
cache.restore().then(() => {
    const state = cache.getState();
});
```
## Hooks example

```ts
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DataCache } from 'cache-persist/lib/Cache';

const [result, setResult] = useState<{loading: boolean, data: DataCache}>({loading: true, data: {}});

  useEffect(() => {
    cache.restore().then(() => setResult({loading: false, data: cache.getState()}))
  },
    []);
```