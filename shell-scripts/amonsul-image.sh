#! /bin/bash -x
DATE=$(/bin/date "+%Y_%m_%d-%H_%M_%S")
/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@10.4.0.11 raspistill -rot 180 -o - > /data/images/amonsul/${DATE}.jpg
/bin/ln -fs /data/images/amonsul/${DATE}.jpg /data/images/amonsul/latest.jpg
/bin/find /data/images/amonsul/* -mtime +60 -delete
