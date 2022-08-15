import fs from "fs";
import path from "path";

import { homeDir } from "./constants/index.js";

const extractInformation = async (file) => {
  try {
    return JSON.parse(fs.readFileSync(file, { encoding: "utf-8" }));
  } catch (error) {
    throw error;
  }
};

const getAllLists = async () => {
  const file = path.resolve(homeDir, "./configuration/lists.json");
  const data = await extractInformation(file);
  return data.lists;
};

export { getAllLists };
