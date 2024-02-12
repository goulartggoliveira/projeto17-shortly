import { db } from "../database/database.connection.js"

export function getUserByEmail(email) {
 return   db.query( `SELECT * FROM users WHERE email = $1;`,[email])

}

export function createUser(name, email, passwrod){
 return   db.query( `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,[name, email, passwrod])

}