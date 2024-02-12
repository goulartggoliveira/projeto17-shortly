import { db } from "../database/database.connection.js";

export function createShortUrl(url, shortUrl, userId) {
  return db.query(
    `INSERT INTO urls (url, "shortUrl", "userId")
    VALUES ($1, $2, $3) RETURNING id, "shortUrl";`,
    [url, shortUrl, userId]
  );
}

export function getUrlId(id) {
  return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id=$1;`, [id]);
}

export function getUrlName(shortUrl) {
  return db.query(`SELECT url FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);
}

export function increaseVisits(shortUrl) {
  return db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" =$1;`,
    [shortUrl]
  );
}

export function deleteUserUrl(id){
  return db.query(`DELETE FROM urls WHERE id=$1;`, [id])
}

export function getOnlyUserId(id){
  return db.query(`SELECT "userId" FROM urls WHERE id= $1;`, [id])
}