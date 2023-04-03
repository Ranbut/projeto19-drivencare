import db from "../config/database.js";

async function createSession(token, id, type) {
    await db.query(
      `
          INSERT INTO sessions (token, "userId", "userType")
          VALUES ($1, $2, $3)
      `,
      [token, id, type]
    );
  }
  
async function findSessionByToken(token) {
    return await db.query(
      `
          SELECT * FROM sessions WHERE token = $1
      `,
      [token]
    );
  }

export default {
    createSession,
    findSessionByToken,
  };