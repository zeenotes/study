title: Python Programming

## Python Scripting

- a simple python script
- attach to a port on a system and see if a port is listening

```python hl_lines="1"
#!/usr/bin/python
ip = raw_input("Enter the ip: ")
port = input("Enter the port: ")
```

`#!/usr/bin/python` indicates which interpreter to be used

- after saving the file, make the script executable

```
root@kali:~/mydirectory# chmod 744 pythonscript.py
root@kali:~/mydirectory# ./pythonscript.py
Enter the ip: 192.168.20.10
Enter the port: 80
```

- add port scanning functionality

```python hl_lines="2 5 6"
#!/usr/bin/python
import socket
ip = raw_input("Enter the ip: ")
port = input("Enter the port: ")
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
if s.connect_ex((ip, port)):
        print "Port", port, "is closed"
else: 
        print "Port", port, "is open"
```

* use the socket library to perform networking tasks in python

syntax for creating a TCP network socket is `s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)`  
connect to a port using the `connect` function.   
use `connect_ex` as it returns an error code instad of raising an exception like `connect`  

- running the python script again

```
root@kali:~/# ./pythonscript.py
Enter the ip: 192.168.20.10
Enter the port: 80
Port 80 is open
```

- run the script against port 81

```
root@kali:~/# ./pythonscript.py
Enter the ip: 192.168.20.10
Enter the port: 81
Port 81 is closed
```













