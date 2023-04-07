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

async function showPatientsApointementsID(userId, date) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    a.date, a.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    WHERE "patientId"=$1 AND
    date > $2 AND
    ("corfimationStatus"=true OR "corfimationStatus" IS NULL);
    `,
    [userId, date]
  );
}

async function showMedicApointementsID(userId, date) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    a.date, a.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    WHERE "medicId"=$1 AND
    date > $2 AND
    ("corfimationStatus"=true OR "corfimationStatus" IS NULL);
    `,
    [userId, date]
  );
}

async function showPatientsHistoricID(userId) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    a.date, a.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    WHERE "patientId"=$1;
    `,
    [userId]
  );
}

async function showMedicHistoricID(userId) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    a.date, a.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    WHERE "medicId"=$1;
    `,
    [userId]
  );
}

export default {
    create,
    findDuplicate,
    findById,
    confirmStatus,
    showPatientsApointementsID,
    showMedicApointementsID,
    showPatientsHistoricID,
    showMedicHistoricID
  };