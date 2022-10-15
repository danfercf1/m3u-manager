import axios from "axios";

import { xtreamApi } from "./constants/index.js";

const headers = {
  Accept: "application/json",
  "User-Agent": "axios 0.27.2"
};

const getAllChannels = async (api) => {
  const { url, credentials } = api;
  const { actions } = xtreamApi;
  try {
    const getChannels = await axios.get(url, {
      headers,
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

const getAllLiveStreamsByCategory = (categoryId, api) => {
  const { url, credentials } = api;
  const { actions } = xtreamApi;
  try {
    const getChannels = axios.get(url, {
      headers,
      params: {
        username: credentials.userName,
        password: credentials.password,
        action: actions.getAllLiveStreams,
        category_id: categoryId,
      },
    });

    return getChannels;
  } catch (error) {
    console.log(error);
  }
};

export { getAllChannels, getAllLiveStreamsByCategory };
