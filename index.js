import {
  listManager,
  getLists,
  mergeArrays,
  generateList,
  writeList,
  generateXmlList,
  generatedGzipFile,
} from "./library/manager.js";

(async () => {
  try {
    let newList = [];
    const lists = await getLists();

    lists.forEach((list) => {
      newList.push(listManager(list));
    });

    if (newList.length > 0) {
      let [...dataResult] = (await Promise.all(newList)).filter((item) => item);
      const channels = dataResult.map((element) => {
        return element.channels;
      });

      const programs = dataResult
        .map((element) => {
          return element.epg;
        })
        .filter(Boolean);

      const processedlists = mergeArrays(channels);

      const processedXmlLists = mergeArrays(programs);
      // Create new List
      const generatedList = await generateList(processedlists);
      const generatedXmlList = await generateXmlList(
        processedXmlLists,
        processedlists
      );
      // Write the new m3u file
      await writeList(generatedList);
      await writeList(generatedXmlList, "xml");
      await generatedGzipFile(generatedXmlList);
      console.log(generatedList);
    }
  } catch (error) {
    console.log(error);
  }
})();
