#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@radagast raspistill -o - > /data/imladris/homeassistant/images/radagast/${DATE}.jpg
/bin/ln -fs /data/imladris/homeassistant/images/radagast/${DATE}.jpg /data/imladris/homeassistant/images/radagast/latest.jpg
/usr/bin/find /data/imladris/homeassistant/images/radagast/* -mtime +60 -delete
