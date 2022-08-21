import convert from "xml-js";
import download from "download";
import nodeGzip from "node-gzip";
import fs from "fs";

import { epgDir } from "./constants/index.js";
import { readFile } from "./file.js";
import { filterEpg } from "./list.js";

const getEpg = async (list, filteredChannels = []) => {
  const {
    name,
    epg: { url, gzip },
  } = list;
  const epgName = `${name}.xml`;
  const epgFile = `${epgDir}/${epgName}`;
  let epgProgramms = [];
  let xml;

  if (gzip) {
    const newName = `${name}.gz`;
    await download(url, epgDir, { filename: newName });
    const file = fs.readFileSync(`${epgDir}/${newName}`);
    const xmlUnziped = await nodeGzip.ungzip(file);
    xml = xmlUnziped.toString();
  } else {
    await download(url, epgDir, { filename: epgName });
    xml = await readFile(epgFile);
  }

  const epgLoaded = convert.xml2js(xml, { compact: true });

  if (epgLoaded.tv) {
    epgProgramms = epgLoaded.tv.programme;
  }

  const filteredEpgList = await filterEpg(epgProgramms, filteredChannels);

  return filteredEpgList;
};

const generateXml = (epgList, channelsList) => {
  const xml = `<?xml version="1.0" encoding="ISO-8859-1"?><!DOCTYPE tv SYSTEM "xmltv.dtd">`;

  const channel = channelsList.map((element) => {
    return {
      _attributes: {
        id: element.tvg.id,
      },
      "display-name": element.name,
      icon: element.tvg.logo,
    };
  });

  const newList = {
    tv: {
      _attributes: {
        "generator-info-name": "Danfercf List Generator",
        "generator-info-url": "https://github.com/danfercf1/m3u-manager",
      },
      channel,
      programme: epgList,
    },
  };

  const convertedXml = convert.js2xml(newList, { compact: true });
  return `${xml}${convertedXml}`;
};

export { getEpg, generateXml };
