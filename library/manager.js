import _ from "lodash";

import {
  statuses,
  generatedList as generatedListName,
  generatedXml,
} from "./constants/index.js";
import { getAllLists } from "./extractData.js";
import { listfromM3u } from "./channels/m3u.js";
import { createList, mergeList, mapM3uXtreamCodeData } from "./list.js";
import { writeFile } from "./file.js";
import { liveChannels } from "./channels/live.js";
import {
  getAllChannelsByCategories,
  getChannelsByCategory,
} from "./channels/selected/category.js";
import { getEpg, generateXml, generateGzipFile } from "./xml.js";

const listManager = async (list) => {
  const { status, mergeApiM3u, mapM3uXtreamCode } = list;
  let filteredList = [];
  let resultChannelsByCategory = [];
  let resultData = {};

  if (status === statuses.enabled) {
    if (list.m3u && !list.api) {
      // Get filtered channels from m3u
      const filteredListFromM3u = await listfromM3u(list);
      filteredList = filteredListFromM3u;
    }

    if (list.api && list.api.categories) {
      resultChannelsByCategory = await channelsByCategory(
        list.api.categories,
        list.api
      );
    }

    if (list.api && !list.m3u) {
      // From Xtream Code API
      if (resultChannelsByCategory.length > 0)
        list.selection = list.selection.concat(resultChannelsByCategory);
      const filteredListFromApi = await liveChannels(list);

      filteredList = filteredListFromApi;
    }

    if (list.api && list.m3u && mergeApiM3u) {
      if (resultChannelsByCategory.length > 0)
        list.selection = list.selection.concat(resultChannelsByCategory);
      const filteredListFromM3u = await listfromM3u(list);
      // From Xtream Code API
      const filteredListFromApi = await liveChannels(list);

      // Merge channels
      const mergedChannels = await mergeList(
        filteredListFromM3u,
        filteredListFromApi
      );
      // Map Channels
      if (mapM3uXtreamCode) {
        const mappedChannels = await mapM3uXtreamCodeData(mergedChannels);
        filteredList = mappedChannels;
      } else {
        filteredList = mergedChannels;
      }
    }

    if (list.epg) {
      const epgList = await getEpg(list, filteredList);
      resultData = {
        listName: list.name,
        channels: filteredList,
        epg: epgList,
      };

      return resultData;
    }

    resultData = {
      listName: list.name,
      channels: filteredList,
    };
    return resultData;
  }
};

const getLists = async () => {
  return await getAllLists();
};

const mergeArrays = (listArray) => {
  return _.spread(_.union)(listArray);
};

const generateList = async (list) => {
  return await createList(list);
};

const writeList = async (list, type = "m3u") => {
  if (type === "m3u") writeFile(generatedListName, list);
  else writeFile(generatedXml, list);
};

const channelsByCategory = async (categories, api) => {
  const result = categories.map(async (category) => {
    return await getAllChannelsByCategories(category, api);
  });

  return await getChannelsByCategory(result);
};

const generateXmlList = async (epgList, channelsList) => {
  return await generateXml(epgList, channelsList);
};

const generatedGzipFile = async (xml) => {
  return await generateGzipFile(xml);
};

export {
  listManager,
  getLists,
  mergeArrays,
  generateList,
  writeList,
  generateXmlList,
  generatedGzipFile,
};
