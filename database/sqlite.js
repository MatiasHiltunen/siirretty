import sqlite3 from "sqlite3";

export const db = new sqlite3.Database('database/db.sqlite')

db.exec("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, age INTEGER, jti TEXT)")

/* db.serialize(()=>{

    const stmt = db.prepare("INSERT INTO user VALUES (NULL, ?, ?)")

    stmt.run("Mie", 30)

    stmt.finalize()

})
 */
