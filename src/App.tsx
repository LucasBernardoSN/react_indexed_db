import axios from 'axios';
import { useEffect, useState } from 'react';
import { IndexedDb, useIndexedDb } from './db/useIndexedDb';

const IMAGE_URL =
  'https://avatars.githubusercontent.com/u/98768420?s=400&u=50d28fdfb9273b41715835f6d5e1465241996812&v=4';

function App() {
  const { createObjectStore } = useIndexedDb();

  const [indexedDb, setIndexedDb] = useState<IndexedDb | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    const runIndexDb = async () => {
      const newIndexedDb = await createObjectStore('banco_teste', [
        'user_profile_images',
      ]);
      setIndexedDb(newIndexedDb);
    };

    runIndexDb();
  }, [createObjectStore]);

  async function storeImage() {
    if (indexedDb) {
      await axios
        .get(IMAGE_URL, {
          responseType: 'blob',
        })
        .then((response) => {
          const url = new Blob([response.data], {
            type: response.headers['content-type'],
          });

          indexedDb.putValue('user_profile_images', {
            createdAt: new Date().toISOString(),
            url,
            // id: "aljkdbjaehob",
          });
        });
    }
  }

  async function getUserImageProfile() {
    if (indexedDb) {
      const result = await indexedDb.getValue('user_profile_images', 1);
      const url = window.URL.createObjectURL(result.url);
      setImageUrl(url);
    }
  }

  return (
    <div>
      <button onClick={storeImage}>Store Image</button>
      <button onClick={getUserImageProfile}>Get Image</button>
      <img src={imageUrl} />
    </div>
  );
}
export default App;
