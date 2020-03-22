#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@sauron raspistill -o - > /data/nogrod/homeassistant/images/sauron/${DATE}.jpg
/bin/ln -fs /data/nogrod/homeassistant/images/sauron/${DATE}.jpg /data/nogrod/homeassistant/images/sauron/latest.jpg
/usr/bin/find /data/nogrod/homeassistant/images/sauron/* -mtime +60 -delete
