import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

//transakcja polega na tym, że całe zapytanie jest traktowane jako całość a jeśli pojedyncza jego część
// jest błędna / ktoraś częśc zakonczy się niepowodzeniem, wtedy całe zapytanie jest anulowane, żeby
// nie wykonywać operacji na bazie danych z błędnymi / uszkodzonymi danymi
export const init = () => {
    //tworzę promisa żeby w momencie wywołania funkcji init w dowolnym miejscu aplikacji zwracała obietnicę
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
                //funkcja executesql przyjmuje 4 argumenty - zaptytanie, tablicę zależności i funkcje sukcesu i błędu
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);',
                    [],
                    () => {
                        resolve()
                    },
                    (_, err) => {
                        reject(err)
                    })
            }
        )
    })
}

export const insertPlace = (title, img, address, lat, lng) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
                //nie używam w zapytaniu backtików `` i znaku dolara bo to furtka do ataku SQL Injection, zamiast
                // tego daję znaki zapytania a wartości przesyłam w tablicy argumentów
                tx.executeSql(
                    'INSERT INTO places (title, imageUri, address, latitude, longitude) VALUES (?, ?, ?, ?, ?);',
                    [title, img, address, lat, lng],
                    (_, result) => {
                        resolve(result)
                    },
                    (_, err) => {
                        reject(err)
                    })
            }
        )
    })
}

export const fetchPlaces = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
                tx.executeSql('SELECT * FROM places;',
                    [],
                    (_, result) => {
                        resolve(result)
                    },
                    (_, err) => {
                        reject(err)
                    })
            }
        )
    })
}
