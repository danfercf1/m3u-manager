import { fixChannelNameforApi, filterList } from '../list.js';
import { getAllChannels } from '../api.js';
import { getSelectedChannelsByName } from "./selected/index.js";

const liveChannels = async () => {
  try {
    // From Xtream Code API
    const listFromApi = await getAllChannels();

    const fixedListFromApi = await fixChannelNameforApi(listFromApi);

    return await filterList(fixedListFromApi, await getSelectedChannelsByName(), 'xtream-code');
  } catch (error) {
    console.log(error);
  }
};

export {
  liveChannels
}
