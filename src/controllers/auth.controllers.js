import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createUser, getUserByEmail } from "../repositories/user.repository.js";
import { createSession } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (user.rowCount !== 0)
      return res.status(409).send(`E-mail already in use`);

    const hash = bcrypt.hashSync(password, 10);

    await createUser(name, email, hash);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (user.rowCount === 0) return res.status(401).send(`E-mail not found`);
    
    const passwordCorrect = bcrypt.compareSync(password, user.rows[0].password);
    if (!passwordCorrect) return res.status(401).send(`Password incorrect`);

    const token = uuid()
    await createSession(user.rows[0].id, token)
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
}
