import { selectedChannelsByName, selectedChannels } from "../../constants/selected.js";
import { getChannels as eventsChannels } from "./events.js";

const getSelectedChannelsByName = async () => {
  const getManuallySelected = selectedChannelsByName;
  const getEventsSelected = await eventsChannels();

  return getManuallySelected.concat(getEventsSelected.items);
};

const getSelectedChannels = async () => {
    return selectedChannels.concat(await eventsChannels());
};

export { getSelectedChannelsByName, getSelectedChannels };
