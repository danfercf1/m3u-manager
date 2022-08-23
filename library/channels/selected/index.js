const getSelectedChannelsByName = async (list, type = "channel") => {
  if (list.selection) {
    if (type === "epg") {
      return list.selection.map((select) => {
        if (select.epgId) return select.epgId;
      });
    } else {
      return list.selection.map((select) => {
        return select.channel;
      });
    }
  } else {
    return [];
  }
};

export { getSelectedChannelsByName };
