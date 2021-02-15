import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("place.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tsc => {
      tsc.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve("");
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (
  title: string,
  image: string,
  address: string,
  lat: number,
  lng: number
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tsc => {
      tsc.executeSql(
        `INSERT INTO places (title, image, address, lat, lng) VALUES(?, ?, ?, ?, ?);`,
        [title, image, address, lat, lng],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tsc => {
      tsc.executeSql(
        `SELECT * FROM places`,
        [],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};
