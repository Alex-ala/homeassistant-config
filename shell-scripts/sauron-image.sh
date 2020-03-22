#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@sauron raspistill -o - > /data/images/ir/${DATE}.jpg
/bin/ln -fs /data/images/ir/${DATE}.jpg /data/images/ir/latest.jpg
/usr/bin/find /data/images/ir/* -mtime +60 -delete