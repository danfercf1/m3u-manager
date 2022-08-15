import { getAllLiveStreamsByCategory } from '../../api.js';

const getAllChannelsByCategories = async (category, api) => {
  const { name, categoryId } = category;

  const channels = {
    category: name,
    apiData: await getAllLiveStreamsByCategory(categoryId, api)
  }

  return channels;
};

const getChannelsByCategory = async (promises) => {
  const newCategorySelected = [];
  const resolvedPromised = await Promise.all(promises);
  resolvedPromised.forEach((data) => {
    const { category, apiData } = data;
    apiData.data.forEach((element) => {
      const channel = {
        category,
        channel: element.name,
      };

      newCategorySelected.push(channel);
    });
  });
  return newCategorySelected;
}

export { getAllChannelsByCategories, getChannelsByCategory };
