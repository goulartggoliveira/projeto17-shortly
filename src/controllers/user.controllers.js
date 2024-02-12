import { getUrlsUsers, getUserId } from "../repositories/user.repository.js";

export async function getCurrentUser(req, res) {
    const { userId } = res.locals
  try {
    const {rows: [user]} = await getUserId(userId)
    const {rows: urls} = await getUrlsUsers(userId)
    res.send({...user, shortenedUrls: [...urls]})

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserRanking(req, res) {
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
}
