import { M3uPlaylist, M3uMedia } from "m3u-parser-generator";
import _ from "lodash";
import parser from "iptv-playlist-parser";

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

const createList = async (channelData, selectedChannels) => {
  const playlist = new M3uPlaylist();
  playlist.title = `danfercf's IPTV`;

  channelData.forEach((channel) => {
    const media = new M3uMedia(channel.url);
    const channelName = channel.name;
    media.attributes = {
      "tvg-id": channel.tvg.id,
      "tvg-language": "ES",
      "tvg-logo": channel.tvg.logo,
    };
    media.duration = -1;
    media.name = channelName;
    media.group = selectGroupByChannel(channelName, selectedChannels);

    playlist.medias.push(media);
  });

  return playlist.getM3uString();
};

const selectGroupByChannel = (channelName, selectedChannels) => {
  const channelGroup = selectedChannels.find((c) =>
    c.items.includes(channelName)
  );
  return channelGroup.name;
};

const mergeList = async (m3uList, xtreamCodeList) => {
  return _.merge(m3uList, xtreamCodeList);
};

const mapM3uXtreamCodeData = async (joined) => {
  return joined.map((channel) => {
    const name = channel.name;
    return {
      name: name,
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

export {
  getPlayList,
  filterList,
  createList,
  mapM3uXtreamCodeData,
  mergeList,
  fixChannelNameforApi,
};
