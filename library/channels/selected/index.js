const getSelectedChannelsByName = async (list) => {
  return list.selection.map(select => {
    return select.channel;
  });
};

export { getSelectedChannelsByName };
