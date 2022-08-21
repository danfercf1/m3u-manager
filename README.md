# M3u Manager

This project merge a selected bunch of channels from a m3u list an Xcode stream API and returns a M3U list

## Configuration

Create a file called `lists.json` inside the folder configuration it shoul have the below format:

```json
{
  "lists": [
    {
      "name": "iptv-org-bo",
      "status": "enabled",
      "m3u": {
        "url": "https://iptv-org.github.io/iptv/countries/bo.m3u",
        "downloadm3u": true
      },
      "selection": [
        {
          "category": "NATIONAL",
          "channel": "ATB (614p) [Not 24/7]"
        }
      ]
    },
    {
      "name": "iptv-org-it",
      "status": "enabled",
      "m3u": {
        "url": "https://iptv-org.github.io/iptv/countries/it.m3u",
        "downloadm3u": true
      },
      "selection": [
        {
          "category": "ITALY",
          "channel": "Euronews Italiano (720p)"
        }
      ]
    },
    {
      "name": "iptv-org-es",
      "status": "enabled",
      "epg": {
        "url": "http://www.iptv.org/epg.gzip",
	"gzip": true
      },
      "m3u": {
        "url": "https://iptv-org.github.io/iptv/countries/es.m3u"
      },
      "selection": [
        {
          "category": "NATIONAL",
          "channel": "Canal 2000 La Solana (720p)"
        }
      ]
    },
    {
      "name": "danfercf",
      "status": "enabled",
      "mergeApiM3u": true,
      "mapM3uXtreamCode": true,
      "epg": {
        "url": "http://www.iptv.org/epg.xml",
	"gzip": false
      },
      "api": {
        "credentials": {
          "userName": "your_user",
          "password": "your_password"
        },
        "url": "http://www.iptv.org/player_api.php",
        "categories": [
          {
            "name": "EVENTS",
            "categoryId": 33
          },
          {
            "name": "ADULTS",
            "categoryId": 26
          }
        ]
      },
      "m3u": {
        "url": "http://www.iptv.org/iptv.m3u",
        "downloadm3u": true
      },
      "selection": [
        {
          "category": "DOCUMENTARY",
          "channel": "ANIMAL PLANET"
        },
      ]
    }
  ]
}
```

You can choose a bunch of categories using the `categories` configuration

```json
"categories": [
    {
        "name": "EVENTS",
        "categoryId": 33
    },
    {
        "name": "ADULTS",
        "categoryId": 26
    }
]
```

The API configuration is for a Xtream code iptv API [https://xtream-ui.org/api-xtreamui-xtreamcode/](https://xtream-ui.org/api-xtreamui-xtreamcode/)

## Install

You need to run the command to install all the dependencies

```bash
npm i
```

## M3U List

The list will be generated inside the folder ./lists/generated/ with the name `iptv.m3u`
