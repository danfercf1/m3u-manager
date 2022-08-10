import { writeFile } from './library/file.js';
import { createList, mapM3uXtreamCodeData, mergeList } from './library/list.js';
import { getSelectedChannels } from './library/channels/selected/index.js';
import { liveChannels } from './library/channels/live.js';
import { listfromM3u } from './library/channels/m3u.js'

const listName = "iptv.m3u";
const m3uFile = `./lists/${listName}`;
const newFile = `./lists/generated/${listName}`;

(async () => {
  try {
    // From m3u file
    
    const filteredListFromM3u = await listfromM3u(m3uFile);

    // From Xtream Code API
    
    const filteredListFromApi = await liveChannels();

    // Merge channels

    const mergedChannels = await mergeList(filteredListFromM3u, filteredListFromApi);

    // Map Channels

    const mappedChannels = await mapM3uXtreamCodeData(mergedChannels);

    // Create new List

    const newList = await createList(mappedChannels, await getSelectedChannels());

    // Write the new m3u file

    await writeFile(newFile, newList);

    console.log(mappedChannels);

  } catch (error) {
    console.log(error);
  }
})();
