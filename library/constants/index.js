import { config } from "dotenv";
import path from "path";

config();

const homeDir = path.resolve(path.dirname(""));
const listsDir = path.resolve(homeDir, "lists");
const epgDir = path.resolve(homeDir, "epg");
const m3uListName = process.env.M3U_LIST_NAME || "iptv-custom.m3u";
const xmlName = process.env.XML_LIST_NAME || "iptv-custom.xml";
const gzipName = process.env.GZIP_LIST_NAME || "iptv-custom.xml.gz";

const generatedList = path.resolve(homeDir, `./lists/generated/${m3uListName}`);
const generatedXml = path.resolve(homeDir, `./lists/generated/${xmlName}`);
const generatedGzip = path.resolve(homeDir, `./lists/generated/${gzipName}`);
const m3uListTitle = process.env.M3U_LIST_TITLE || "Danfercf IPTV";
const optimizedForKodi = process.env.OPTIMIZED_FOR_KODI || true;

const statuses = {
  enabled: "enabled",
  disabled: "disabled",
};

const xtreamApi = {
  actions: {
    getAllLiveStreams: "get_live_streams",
    getLiveCategories: "get_live_categories",
    getVODStreams: "get_vod_streams ",
    getVODCategories: "get_vod_categories ",
    getSeriesStreams: "get_series",
    getSeriesCategories: "get_series_categories",
  },
};

export {
  xtreamApi,
  homeDir,
  listsDir,
  statuses,
  generatedList,
  m3uListTitle,
  optimizedForKodi,
  epgDir,
  generatedXml,
  generatedGzip,
};
