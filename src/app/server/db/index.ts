import { PostgreSQL } from "fxsql";

import dotenv from "dotenv";

dotenv.config();

const { CONNECT } = PostgreSQL;

const POOL = CONNECT({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  port: 5432,
});

export const {
  VALUES,
  IN,
  NOT_IN,
  EQ,
  SET,
  COLUMN,
  CL,
  TABLE,
  TB,
  SQL,
  FxSQL_DEBUG,
  QUERY,
  ASSOCIATE,
  LJOIN,
  TRANSACTION,
  END,
} = POOL;
