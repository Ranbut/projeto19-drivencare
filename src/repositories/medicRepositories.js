import db from "../config/database.js";

async function newMedic({ name, cpf, address, email, password, specialization }) {
  return await db.query(
    `
    INSERT INTO medics
        (name, cpf, address, email, password, specialization)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
    [name, cpf, address, email, password, specialization]
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

async function findByName(name) {
  const like = `%${name}%`
  return await db.query(
    `
    SELECT
        id, name, specialization, address
    FROM medics 
    WHERE "name" LIKE $1
    `,
    [like]
  );
}

async function findBySpecialty(specialization) {
  return await db.query(
    `
    SELECT 
        id, name, specialization, address 
      FROM medics 
      WHERE specialization=$1
    `,
    [specialization]
  );
}

async function findByAddress(address) {
  const like = `%${address}%`
  return await db.query(
    `
    SELECT
        id, name, specialization, address
    FROM medics 
    WHERE address LIKE $1
    `,
    [like]
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