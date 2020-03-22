#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@sauron raspistill -o - > /data/nogrod/homeassistant/images/ir/${DATE}.jpg
/bin/ln -fs /data/nogrod/homeassistant/images/ir/${DATE}.jpg /data/nogrod/homeassistant/images/ir/latest.jpg
/usr/bin/find /data/nogrod/homeassistant/images/ir/* -mtime +60 -delete
