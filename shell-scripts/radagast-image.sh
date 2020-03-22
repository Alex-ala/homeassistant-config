#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@radagast raspistill -o - > /data/images/radagast/${DATE}.jpg
/bin/ln -fs /data/images/radagast/${DATE}.jpg /data/images/radagast/latest.jpg
/usr/bin/find /data/images/radagast/* -mtime +60 -delete
