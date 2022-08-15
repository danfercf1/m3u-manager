import { config } from "dotenv";
import path from "path";

config();

const homeDir = path.resolve(path.dirname(""));
const listsDir = path.resolve(homeDir, "lists");
const generatedList = path.resolve(homeDir, "./lists/generated/iptv.m3u");

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

export { xtreamApi, homeDir, listsDir, statuses, generatedList };
