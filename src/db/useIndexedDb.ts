import { IDBPDatabase, openDB } from 'idb';

export function useIndexedDb() {
  const getValue = async (db: IDBPDatabase, tableName: string, id: number) => {
    const transaction = db.transaction(tableName, 'readonly');
    const store = transaction.objectStore(tableName);
    const result = await store.get(id);
    return result;
  };

  const getAllValue = async (db: IDBPDatabase, tableName: string) => {
    const transaction = db.transaction(tableName, 'readonly');
    const store = transaction.objectStore(tableName);
    const result = await store.getAll();
    return result;
  };

  const putValue = async (
    db: IDBPDatabase,
    tableName: string,
    value: object
  ) => {
    const transaction = db.transaction(tableName, 'readwrite');
    const store = transaction.objectStore(tableName);
    const result = await store.put(value);
    return result;
  };

  const deleteValue = async (
    db: IDBPDatabase,
    tableName: string,
    id: number
  ) => {
    const transaction = db.transaction(tableName, 'readwrite');
    const store = transaction.objectStore(tableName);
    const result = await store.get(id);
    if (!result) {
      return result;
    }
    await store.delete(id);
    return id;
  };

  const createObjectStore = async (
    dataBaseName: string,
    tableNames: string[]
  ) => {
    const db = await openDB(dataBaseName, 1, {
      upgrade(currentDb: IDBPDatabase) {
        tableNames.forEach((tableName) => {
          if (currentDb.objectStoreNames.contains(tableName)) return;

          currentDb.createObjectStore(tableName, {
            autoIncrement: true,
            keyPath: 'id',
          });
        });
      },
    });

    return {
      getValue: (tableName: string, id: number) => getValue(db, tableName, id),
      getAllValue: (tableName: string) => getAllValue(db, tableName),
      putValue: (tableName: string, value: object) =>
        putValue(db, tableName, value),
      deleteValue: (tableName: string, id: number) =>
        deleteValue(db, tableName, id),
    };
  };

  return { createObjectStore };
}

export type IndexedDb = {
  getValue: (tableName: string, id: number) => Promise<unknown>;
  getAllValue: (tableName: string) => Promise<unknown[]>;
  putValue: (tableName: string, value: object) => Promise<IDBValidKey>;
  deleteValue: (tableName: string, id: number) => Promise<unknown>;
};
