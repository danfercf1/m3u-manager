import {
  listManager,
  getLists,
  mergeArrays,
  generateList,
  writeList,
} from "./library/manager.js";

(async () => {
  try {
    let newList = [];
    const lists = await getLists();

    lists.forEach((list) => {
      newList.push(listManager(list));
    });

    if (newList.length > 0) {
      const processedlists = mergeArrays(
        (await Promise.all(newList)).filter((item) => item)
      );
      // Create new List
      const generatedList = await generateList(processedlists);
      // Write the new m3u file
      await writeList(generatedList);
      console.log(generatedList);
    }
  } catch (error) {
    console.log(error);
  }
})();
