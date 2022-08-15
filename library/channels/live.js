import { fixChannelNameforApi, filterList } from "../list.js";
import { getAllChannels } from "../api.js";
import { getSelectedChannelsByName } from "./selected/index.js";

const liveChannels = async (list) => {
  try {
    const { api } = list;
    // From Xtream Code API
    const listFromApi = await getAllChannels(api);

    const fixedListFromApi = await fixChannelNameforApi(listFromApi);

    return await filterList(
      fixedListFromApi,
      await getSelectedChannelsByName(list),
      "xtream-code"
    );
  } catch (error) {
    console.log(error);
  }
};

export { liveChannels };
