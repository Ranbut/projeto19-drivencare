import db from "../config/database.js";

async function create(medicId, patientId, dateTimeId) {
    return await db.query(
      `
      INSERT INTO appointments ("medicId", "patientId", "dateTimeId")
      VALUES ($1, $2, $3);
      `,
      [medicId, patientId, dateTimeId]
    );
  }

async function findDateTimeAvaliable(date, time) {
    return await db.query(
      `
      SELECT id FROM "availableDatesTimes" WHERE date=$1 AND time=$2 AND "isAvailable"=true;
      `,
      [date, time]
    );
  }

async function findDuplicate(medicId, dateTimeId) {
  return await db.query(
    `
    SELECT *
    FROM appointments
    WHERE 
    "medicId" = $1 AND 
    "dateTimeId" = $2;
    `,
    [medicId, dateTimeId]
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
    d.date, d.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    LEFT JOIN "availableDatesTimes" d
    ON a."dateTimeId" = d.id
    WHERE a."patientsId"= $1 AND
    d.date >= $2 AND
    ("corfimationStatus"=true OR "corfimationStatus" IS NULL);
    `
    [userId, date]
  );
}

async function showMedicApointementsID(userId, date) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    d.date, d.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    LEFT JOIN "availableDatesTimes" d
    ON a."dateTimeId" = d.id
    WHERE a."medicId"= $1 AND
    d.date >= $2 AND
    ("corfimationStatus"=true OR "corfimationStatus" IS NULL);
    `,
    [userId, date]
  );
}

async function showPatientsHistoricID(userId) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    d.date, d.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    LEFT JOIN "availableDatesTimes" d
    ON a."dateTimeId" = d.id
    WHERE a."patientsId" = $1;
    `,
    [userId]
  );
}

async function showMedicHistoricID(userId) {
  return await db.query(
    `
    SELECT p.name as patient, m.name as medic, m.specialization,
    d.date, d.time, a."corfimationStatus"
    FROM appointments a
    LEFT JOIN "patients" p
    ON a."patientId" = p.id
    LEFT JOIN "medics" m
    ON a."patientId" = m.id
    LEFT JOIN "availableDatesTimes" d
    ON a."dateTimeId" = d.id
    WHERE a."medicId" = $1;
    `,
    [userId]
  );
}

export default {
    create,
    findDateTimeAvaliable,
    findDuplicate,
    findById,
    confirmStatus,
    showPatientsApointementsID,
    showMedicApointementsID,
    showPatientsHistoricID,
    showMedicHistoricID
  };