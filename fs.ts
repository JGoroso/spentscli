import { writeFile } from "fs/promises";
import { readFile } from "fs/promises";
import { DB_SPENTS } from ".";

export const writeSpentFile = async (data: any) => {
  await writeFile(DB_SPENTS, JSON.stringify(data));
  return null;
};

export const readSpentFile = async () => {
  try {
    const spents = (await readFile(DB_SPENTS)).toString();
    return spents;
  } catch (error) {
    await writeSpentFile([]);
    return "[]";
  }
};
