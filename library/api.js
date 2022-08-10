import axios from "axios";

import { api } from './constants/index.js';

const getAllChannels = async () => {
  const { url, credentials, actions, categories } = api;
  try {
    const getChannels = await axios.get(url, {
      params: {
        username: credentials.userName,
        password: credentials.password,
        action: actions.getAllLiveStreams,
      },
    });

    return getChannels.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllLiveStreamsByCategory = async (categoryId) => {
  const { url, credentials, actions } = api;
  try {
    const getChannels = await axios.get(url, {
      params: {
        username: credentials.userName,
        password: credentials.password,
        action: actions.getAllLiveStreams,
        category_id: categoryId
      },
    });

    return getChannels.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllChannels, getAllLiveStreamsByCategory };
