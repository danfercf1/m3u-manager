import { api } from '../../constants/index.js'

import { getAllLiveStreamsByCategory } from '../../api.js';

const { categories } = api;

const getChannels = async () => {
  let newEventSelected = {
    name: 'Events',
    items: []
  };
  const eventsId = categories.events;

  const events = await getAllLiveStreamsByCategory(eventsId);

  events.forEach(element => {
    newEventSelected.items.push(element.name);
  });

  return newEventSelected;
};

export { getChannels };
