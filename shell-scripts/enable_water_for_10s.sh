#! /bin/bash -x
/usr/bin/ssh -i /home/homeassistant/.ssh/id_rsa smarthome@radagast.ahome bash -c "
echo 26 > /sys/class/gpio/export || true
echo out > /sys/class/gpio/gpio26/direction || true
echo 1 > /sys/class/gpio/gpio26/value
sleep 20
echo 0 > /sys/class/gpio/gpio26/value
"
