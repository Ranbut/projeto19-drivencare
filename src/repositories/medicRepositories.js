import db from "../config/config.connection.js";

async function findByEmail(email) {
  return await db.query(
    `
    SELECT * FROM medics WHERE email=$1
    `,
    [email]
  );
}

async function findByCpf(cpf) {
  return await db.query(
    `
    SELECT * FROM medics WHERE cpf=$1
    `,
    [cpf]
  );
}

async function findById(id) {
  return await db.query(
    `
    SELECT * FROM medics WHERE id=$1
    `,
    [id]
  );
}

async function findByName(name) {
  return await db.query(
    `
    SELECT
        id, "fullName", specialty, address
    FROM medics 
    WHERE name LIKE $1
    `,
    [name]
  );
}

async function findBySpecialty(specialty) {
  return await db.query(
    `
    SELECT
        id, "fullName", specialty, address
    FROM medics 
    WHERE specialty LIKE $1
    `,
    [specialty]
  );
}

async function findByLocalization(localization) {
  return await db.query(
    `
    SELECT
        id, "fullName", specialty, address
    FROM medics 
    WHERE address LIKE $1
    `,
    [localization]
  );
}

async function newMedic({ fullName, cpf, address, email, password, specialization }) {
  return await db.query(
    `
    INSERT INTO medics
        ("fullName", cpf, address, email, password, specialization)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [fullName, cpf, address, email, password, specialization]
  );
}

export default {
  findByEmail,
  newMedic,
  findById,
  findByCpf,
  findByName,
  findBySpecialty,
  findByLocalization,
};