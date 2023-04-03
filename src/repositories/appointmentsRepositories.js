import db from "../config/database.js";

async function create(medicId, patientId, date, time) {
    return await db.query(
      `
      INSERT INTO appointments ("medicId", "patientId", date, time)
      VALUES ($1, $2, $3, $4)
      `,
      [medicId, patientId, date, time]
    );
  }

async function findDuplicate(medicId, date, time) {
  return await db.query(
    `
    SELECT *
    FROM appointments
    WHERE 
    "medicId" = $1 and 
    date = $2 and 
    (time BETWEEN $3::time - interval '59 minutes' AND $3::time + interval '59 minutes')
    `,
    [medicId, date, time]
  );
}

async function findById(medicId, id) {
  return await db.query(
    `SELECT * FROM appointments WHERE "medicId"=$1 AND "id"=$2`,
    [medicId, id]
  );
}

async function confirmStatus(status, medicId, id) {
  return await db.query(
    `
    UPDATE appointments SET "corfimationStatus" = $1 WHERE "medicId"=$2 AND "id"=$3 
    `,
    [status, medicId, id]
  );
}

async function searchHistoric() {
  return await db.query(
    `
    SELECT * FROM appointments
    `,
    []
  );
}

export default {
    create,
    findDuplicate,
    findById,
    confirmStatus,
    searchHistoric
  };