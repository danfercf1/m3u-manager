import { M3uPlaylist, M3uMedia } from "m3u-parser-generator";
import _ from "lodash";
import parser from "iptv-playlist-parser";

import { m3uListTitle, optimizedForKodi } from "./constants/index.js";

const getPlayList = async (list) => {
  try {
    return parser.parse(list);
  } catch (error) {
    return error;
  }
};

const filterList = async (
  parsedList,
  channelsSelected,
  requestType = "m3u"
) => {
  let channelsList = [];

  requestType === "m3u"
    ? (channelsList = parsedList.items)
    : (channelsList = parsedList);

  if (channelsList.length > 1) {
    return channelsList.filter((list) => {
      return channelsSelected.includes(list.name);
    });
  } else {
    throw "There is not items";
  }
};

const createList = async (channelData) => {
  const playlist = new M3uPlaylist();
  playlist.title = m3uListTitle;

  channelData.forEach((channel) => {
    const media = new M3uMedia(channel.url);
    const channelName = channel.name;

    media.attributes = {
      "tvg-id": channel.tvg.id || "",
      "tvg-name": channel.tvg.name || "",
      "tvg-language": channel.tvg.language || "ES",
      "tvg-country": channel.tvg.country || "",
      "tvg-logo": channel.tvg.logo || "",
      "tvg-url": channel.tvg.url || "",
      "tvg-rec": channel.tvg.rec || "",
    };
    media.duration = -1;
    media.name = channelName;
    media.group = channel.group ? channel.group.title : "";

    playlist.medias.push(media);
  });

  const m3uListGenerated = playlist.getM3uString();

  if (optimizedForKodi) {
    return addKodiOptimization(m3uListGenerated);
  } else {
    return m3uListGenerated;
  }
};

const selectGroupByChannel = (channelName, selectedChannels) => {
  const channelGroup = selectedChannels.find((c) => c.channel === channelName);
  return channelGroup.category;
};

const mergeList = async (m3uList, xtreamCodeList) => {
  return _.merge(m3uList, xtreamCodeList);
};

const mapM3uXtreamCodeData = async (joined) => {
  return joined.map((channel) => {
    const name = channel.name;
    return {
      name: name,
      group: {
        title: channel.group ? channel.group.title : "",
      },
      url: channel.url,
      tvg: {
        id: channel.epg_channel_id,
        name: name,
        language: "",
        country: "",
        logo: channel.stream_icon,
        url: "",
        rec: "",
      },
    };
  });
};

const fixChannelNameforApi = async (filteredList) => {
  return filteredList.map((value) => {
    return {
      num: value.num,
      name: value.name.trim(),
      stream_type: value.stream_type,
      stream_id: value.stream_id,
      stream_icon: value.stream_icon,
      epg_channel_id: value.epg_channel_id,
      added: value.added,
      category_id: value.category_id,
      custom_sid: value.custom_sid,
      tv_archive: value.tv_archive,
      direct_source: value.direct_source,
      tv_archive_duration: value.tv_archive_duration,
    };
  });
};

const addKodiOptimization = async (m3uList) => {
  let newM3u = "#EXTM3U\n";
  const m3uListSplitted = m3uList.split(/\r?\n/);
  newM3u = `${newM3u}${m3uListSplitted[1]}\n`;
  for (let index = 2; index < m3uListSplitted.length; index++) {
    const value = m3uListSplitted[index];
    newM3u = `${newM3u}${value}\n`;
    if (value.search("#EXTGRP") !== -1)
      newM3u = `${newM3u}#KODIPROP:inputstream=inputstream.adaptive\n#KODIPROP:inputstream.adaptive.manifest_type=hls\n`;
  }
  return newM3u;
};

export {
  getPlayList,
  filterList,
  createList,
  mapM3uXtreamCodeData,
  mergeList,
  fixChannelNameforApi,
  selectGroupByChannel,
};
