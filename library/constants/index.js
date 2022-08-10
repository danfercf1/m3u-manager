const api = {
  url: "http://51.161.115.48:8080/player_api.php",
  credentials: {
    userName: "danfercf",
    password: "d4nf3rcf",
  },
  actions: {
    getAllLiveStreams: "get_live_streams",
    getLiveCategories: "get_live_categories",
    getVODStreams: "get_vod_streams ",
    getVODCategories: "get_vod_categories ",
    getSeriesStreams: "get_series",
    getSeriesCategories: "get_series_categories",
  },
  categories: {
    events: 33,
  }
};

const m3u = {
  url: 'http://10.10.10.20/iptv/iptv.m3u'
}

export { api, m3u };
