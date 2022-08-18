const getSelectedChannelsByName = async (list) => {
  if (list.selection) {
    return list.selection.map((select) => {
      return select.channel;
    });
  } else {
    return [];
  }
};

export { getSelectedChannelsByName };
