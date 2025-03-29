import base64

@service
def lora_tabs_encode(topic, fPort, command, value):
    bytes = [0x00, 0x00, 0x00]
    
    if command == "moving_interval":
        bytes[0] = 0x00
    elif command == "stationary_interval":
        bytes[0] = 0x01
    elif command == "moving_timeout":
        bytes[0] = 0x02
    
    bytes[1] = int(value) & 0xff
    bytes[2] = (int(value) >> 8) & 0xff
    
    # Convert the list of integers to bytes
    byte_array = bytearray(bytes)
    
    # Base64 encode the byte array
    encoded_bytes = base64.b64encode(byte_array)
    
    # Convert the encoded bytes to a string and return
    if topic.startswith("ttn"):
      payload = """
      {
          "downlinks": [{
              "f_port": """ + str(fPort) + """,
              "frm_payload": \"""" + encoded_bytes.decode('utf-8') +"""\",
              "confirmed": true
          }]
      }
      """
    else:
      eui = topic.split("/")[3]
      payload = """
      {
         "devEui": \"""" + eui + """\",
         "fPort": """ + str(fPort) + """,
         "data": \"""" + encoded_bytes.decode('utf-8') +"""\",
         "confirmed": true
      }
      """
    mqtt.publish(qos=0, retain=False, topic=topic, payload=payload)
