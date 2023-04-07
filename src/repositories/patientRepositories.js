import db from "../config/database.js";

async function findByEmail(email) {
  return await db.query(
    `
    SELECT * FROM patients WHERE email=$1
    `,
    [email]
  );
}

async function findByCpf(cpf) {
  return await db.query(
    `
    SELECT * FROM patients WHERE cpf=$1
    `,
    [cpf]
  );
}

async function findById(id) {
  return await db.query(
    `
    SELECT * FROM patients WHERE id=$1
    `,
    [id]
  );
}

async function newPatient({ name, cpf, email, password }) {
  return await db.query(
    `
    INSERT INTO patients
        ("name", cpf, email, password)
    VALUES ($1, $2, $3, $4)
    `,
    [name, cpf, email, password]
  );
}


async function checkAvaliableTime(medicId) {
  return await db.query(
    `
    SELECT m.name as medic, date, time
    FROM "availableDatesTimes" a
    LEFT JOIN "medics" m
    ON a."medicId" = m.id
    WHERE a."medicId"=$1
    `,
    [medicId]
  );
}


export default {
  findByEmail,
  findByCpf,
  findById,
  newPatient,
  checkAvaliableTime
};