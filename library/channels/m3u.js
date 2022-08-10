
import download from 'download';

import { m3u } from "../constants/index.js";
import { checkFileExists, readFile } from "../file.js";
import { getPlayList, filterList } from "../list.js";
import { getSelectedChannelsByName } from "./selected/index.js";

const listfromM3u = async (m3uFile) => {
  const { url } = m3u;
  const checkFile = await checkFileExists(m3uFile);

  if (!checkFile) {
    await download(url, "./lists");
  }

  const playlist = await readFile(m3uFile);

  const parsedList = await getPlayList(playlist);

  return await filterList(parsedList, await getSelectedChannelsByName());
};

export { listfromM3u };
