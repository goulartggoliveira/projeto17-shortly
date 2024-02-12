import { db } from "../database/database.connection.js";

export function createShortUrl(url, shortUrl, userId) {
 return db.query(
    `INSERT INTO urls (url, "shortUrl", "userId")
    VALUES ($1, $2, $3) RETURNING id, "shortUrl";`,
    [url, shortUrl, userId]
  );
}

export function getUrlId(id){
    return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id=$1;`, [id])
}