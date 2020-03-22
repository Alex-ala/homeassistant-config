#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@10.4.0.11 raspistill -rot 180 -o - > /data/nogrod/homeassistant/images/amonsul/${DATE}.jpg
/bin/ln -fs /data/nogrod/homeassistant/images/amonsul/${DATE}.jpg /data/nogrod/homeassistant/images/amonsul/latest.jpg
/usr/bin/find /data/nogrod/homeassistant/images/amonsul/* -mtime +60 -delete
