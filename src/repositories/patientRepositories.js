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

async function newPatient({ fullName, cpf, email, password }) {
  return await db.query(
    `
    INSERT INTO patients
        ("fullName", cpf, email, password)
    VALUES ($1, $2, $3, $4)
    `,
    [fullName, cpf, email, password]
  );
}

export default {
  findByEmail,
  findByCpf,
  findById,
  newPatient,
};