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
    return fs.readFileSync(file, { encoding: "utf-8" });
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
};

const getFileName = async (url) => {
  const urlSplitted = url.split("/");
  return urlSplitted.slice(-1);
};

const checkFileName = async (fileName) => {
  const result = fileName[0].match(/.m3u$/s);
  return (result !== null) ? true : false;
};

export { checkFileExists, readFile, writeFile, getFileName, checkFileName };
