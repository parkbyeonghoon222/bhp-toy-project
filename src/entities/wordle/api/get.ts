import { QUERY } from "../../../../server/db";

export const getRandomWord = async (): Promise<string> => {
  const rows = await QUERY`SELECT * FROM wordle.word ORDER BY random() limit 1`;
  return Array.isArray(rows) && rows.length ? rows[0].name : undefined;
};
