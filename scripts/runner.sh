#!/bin/bash

cd  /home/my_user/projects/m3u-manager/
node index.js
cd lists/generated
sudo cp iptv-custom.m3u iptv-custom.xml.gz /var/www/html/iptv/
