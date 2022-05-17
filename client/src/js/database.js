import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1);
  //This will form a new transaction with specified data priveledges (read and write in this case)
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  // We use the put method from idb to change the values in the database
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("Data has been succesfully saved to the DB!", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  // the getAll method below is used to retreive the get all the content from the specified database
  const request = store.getAll();
  const result = await request;
  console.log("result:", result);
  return result;
};

initdb();
