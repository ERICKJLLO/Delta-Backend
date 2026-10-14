import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const findUserByEmail = async (email) => {
  if (!email) return null;

  const result = await pool.query(
    'SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
    [email]
  );

  return result.rows[0] || null;
};

export const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1 LIMIT 1',
    [id]
  );

  return result.rows[0] || null;
};

export const createUser = async (userData) => {
  const {
    email,
    password_hash,
    company_name,
    nit,
    contact_name,
    phone = '',
    address = '',
    industry = '',
    employees = 0,
    plan_id = 'basic',
    activated_at = new Date().toISOString()
  } = userData;

  const result = await pool.query(
    `INSERT INTO users (
      email, password_hash, company_name, nit, contact_name,
      phone, address, industry, employees, plan_id, activated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    )
    RETURNING *`,
    [
      email,
      password_hash,
      company_name,
      nit,
      contact_name,
      phone,
      address,
      industry,
      Number.parseInt(employees, 10) || 0,
      plan_id,
      activated_at
    ]
  );

  return result.rows[0];
};

export const closeDatabase = async () => {
  await pool.end();
};

export default {
  findUserByEmail,
  findUserById,
  createUser,
  closeDatabase
};
