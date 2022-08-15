import download from "download";

import { listsDir } from "../constants/index.js";
import { readFile } from "../file.js";
import { getPlayList, filterList, selectGroupByChannel } from "../list.js";
import { getSelectedChannelsByName } from "./selected/index.js";

const listfromM3u = async (list) => {
  const {
    name,
    selection,
    m3u: { url, downloadm3u },
  } = list;
  const m3uName = `${name}.m3u`;
  const m3uFile = `${listsDir}/${m3uName}`;

  if (downloadm3u) {
    await download(url, listsDir, { filename: m3uName });
  }

  const playlist = await readFile(m3uFile);

  const parsedList = await getPlayList(playlist);

  const filteredList = await filterList(
    parsedList,
    await getSelectedChannelsByName(list)
  );

  return filteredList.map((list) => {
    let newList = list;
    const group = selectGroupByChannel(list.name, selection);
    newList.group.title = group;
    return newList;
  });
};

export { listfromM3u };
