import fs from "fs";

const checkFileExists = async (file) => {
  try {
    await fs.promises.access(file, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const readFile = async (file) => {
  try {
    return fs.readFileSync(file, { encoding: 'utf-8' });
  } catch (error) {
    throw error;
  }
};

const writeFile = async (file, data) => {
    try {
        return fs.writeFileSync(file, data);
      } catch (error) {
        throw error;
      } 
}

export { checkFileExists, readFile, writeFile };
