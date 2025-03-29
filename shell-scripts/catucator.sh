#! /bin/bash -x
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@radagast.ahome bash -c "
echo 19 > /sys/class/gpio/export || true
echo out > /sys/class/gpio/gpio19/direction || true
echo 1 > /sys/class/gpio/gpio19/value
sleep 2
echo 0 > /sys/class/gpio/gpio19/value
"
