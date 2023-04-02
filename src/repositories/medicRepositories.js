import db from "../config/database.js";

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

async function findByName(fullName) {
  return await db.query(
    `
    SELECT
        id, "fullName", specialization, address
    FROM medics 
    WHERE "fullName" LIKE $1
    `,
    [fullName]
  );
}

async function findBySpecialty(specialization) {
  console.log(specialization);
  return await db.query(
    `
    SELECT 
        id, "fullName", specialization, address 
      FROM medics 
      WHERE specialization=$1
    `,
    [specialization]
  );
}

async function findByAddress(address) {
  return await db.query(
    `
    SELECT
        id, "fullName", specialization, address
    FROM medics 
    WHERE address LIKE $1
    `,
    [address]
  );
}

export default {
  newMedic,
  findByEmail,
  findById,
  findByCpf,
  findByName,
  findBySpecialty,
  findByAddress,
};