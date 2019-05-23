title: Linux Command Line

## Basics

### Navigation

- View the  of a folder

```
root@kali:~# ls  
Desktop
```

- view all the files including the hidden directories

```
root@kali:~# ls -a
```

- see the current directory

``` 
root@kali:~# pwd
/root
```

- changing the directory

```
root@kali:~/Desktop# cd ..
root@kali:~/# cd ../etc
root@kali:/etc#
```

- learn more about the command, its options and arguments

```
root@kali:~# man ls
```

### User Access Control

- currently logged in user

```
root@kali:~# whoami
root
```

- adding a new user

```
root@kali:~# adduser hazeez
```


- adding a user to the sudoers file

```
root@kali:~# adduser hazeez sudo
Adding user 'georgia' to group `sudo' ...
Adding user georgia to group sudo
Done.
```

- switching users and using sudo

```
root@kali:~# su hazeez
hazeez@kali:/root$
georgia@kali:/root$ sudo adduser john
[sudo] password for georgia:Adding user `john' ...
Adding new group `john' (1002) ...
Adding new user `john' (1002) with group `john' ...
--snip--
hazeez@kali:/root$ su
Password:root@kali:~#
```

### Files

- creating a new file

```
root@kali:~# touch myfile
```

- creating a new directory

```
root@kali:~# mkdir mydirectory
```

- copying, moving and removing files

```
root@kali:~# cp /root/myfile myfile2
```

syntax is `cp` _source_ _destination_

- moving / renaming a file

```
root@kali:~# mv /root/myfile2 myfile
```

syntax is `mv` _original_file_name_ _new_file_name_


- removing a file from the filesystem

```
root@kali:~# rm myfile
```

syntax is `rm` _file_name_

### Adding Text To File

- echo the output

```
root@kali:~# echo hello hazeez
hello hazeez
```

- saving text to a file

```
root@kali:~# echo hello hazeez > myfile
```

- view the  of a file

```
root@kali:~# cat myfile
```

- echo a different line of text to the file

This will **overwrite** the contents of the file

``` 
root@kali:~# echo hello hazeez again > myfile
```

- apppending text to a file

```
root@kali:~# echo hello hazeez second time >> myfile
```

appending preserves the content of the file

### File Permissions

- view the permissions of the file

```
root@kali:~# ls -l myfile
-rw-r--r-- 1 root root 47 Apr 23 21:15 myfile
```

|              |                             |
|--------------|-----------------------------|
| `-rw-r--r--`   | file type and permissions   |
| `1`            | number of links to the file |
| `root`         | user who owns the file      |
| `root`         | group that owns the file    |
| `47`           | file_size                   |
| `Apr 23 21:15` | date modified               |
| `myfile`       | filename                    |


Linux permissions

`r` - read
`w` - write
`x` - execute

`-rw-` - permission for the owner
`-r--` - permission for the group
`-r--` - permission for all users

- change permissions on a file

```
root@kali:~# chmod 700 myfile
root@kali:~# ls -l myfile
-rwx------ 1 root root 47 Apr 23 21:15 myfile
```

When entering new file permissions, you use one digit for the owner, one for the group, and one for world.


- Editing files

```
root@kali:~# nano myfile
```

**nano** is a text editor

**vi** is another text editor available in linux

### Data Manipulation

Let's take a file with the following contents

```
root@kali:~/mydirectory# cat myfile
1 Derbycon September
2 Shmoocon January
3 Brucon September
4 Blackhat July
5 Bsides *
6 HackerHalted October
7 Hackcon April
```

- using grep

grep looks for instances of a text string in a file

```
root@kali:~# grep September myfile
1 Derbycon September
3 Brucon September
```

- chaining commands
- send the output of grep to other command for processing using (|) pipe command
- using cut command

```
root@kali:~# grep September myfile | cut -d " " -f 2
Derbycon
Brucon
```

The cut command allows to take each line of input, choose a delimiter, and print specific fields.

- using sed command

The sed command is ideal for editing files automatically based on certain patterns or expressions.

For example, to replace all instances of the word Blackhat with Defcon in myfile

```
root@kali:~# sed 's/Blackhat/Defcon' myfile
1 Derbycon September
2 Shmoocon January
3 Brucon September
4 Defcon July
5 Bsides *
6 HackerHalted October
7 Hackcon April
```

- using awk for pattern matching

For example, to find conferences numbered 6 or greater, use awk to search the first field for entries greater than 5

```
root@kali:~# awk '$1 >5' myfile
6 HackerHalted October
7 Hackcon April
```

to print only the first and third words in every line

```
root@kali:~# awk '{print $1,$3;}' myfile
1 September
2 January
3 September
4 July
5 *
6 October
7 April
```

### Manage Installed Packages

On Debian-based Linux distributions such as Kali Linux, use the **Advanced Packaging Tool (apt)** to manage packages.

- installing a package

```
root@kali:~# apt-get install armitage
```

- upgrading a package

```
root@kali:~# apt-get upgrade
```

The repositories Kali uses for packages are listed in the file `/etc/apt/sources.list`

Edit this file to add additional repositories.

Run command `apt-get update` to refresh the database to include the new repositories

### Processes And Services

- starting a service

```
root@kali:~# service apache2 start
[....] Starting web server: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1 for ServerName
. ok
```

- stopping a service

```
root@kali:~# service apache2 stop
```

- restarting a service

```
root@kali:~# service apache2 restart
```

!!! Note

    If the command requires sudo level access, type `sudo service apache2 start`


### Networking

- ping an ip

```
root@kali:~# ping 192.168.20.10
PING 192.168.20.10 (192.168.20.10) 56(84) bytes of data.
64 bytes from 192.168.20.10: icmp_req=1 ttl=64 time=0.090 ms
64 bytes from 192.168.20.10: icmp_req=2 ttl=64 time=0.029 ms
64 bytes from 192.168.20.10: icmp_req=3 ttl=64 time=0.038 ms
64 bytes from 192.168.20.10: icmp_req=4 ttl=64 time=0.050 ms
**^C**
--- 192.168.20.10 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 2999 ms
rtt min/avg/max/mdev = 0.029/0.051/0.090/0.024 ms
```


- view network information
- ifconfig command

``` 
root@kali:~# ifconfig
eth0❶    Link encap:Ethernet  HWaddr 00:0c:29:df:7e:4d
          inet addr:192.168.20.9❷  Bcast:192.168.20.255  Mask:255.255.255.0❸
          inet6 addr: fe80::20c:29ff:fedf:7e4d/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:1756332 errors:930193 dropped:17 overruns:0 frame:0
          TX packets:1115419 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:1048617759 (1000.0 MiB)  TX bytes:115091335 (109.7 MiB)
          Interrupt:19 Base address:0x2024
```

`eth0` - network interface

inet addr:`192.168.20.9` - ip address 

Mask:`255.255.255.0` - Network Mask 

_The address’s network mask, or netmask (Mask), at ❸ identifies which parts of the IP address are part of the network and which parts belong to the host._

The _default gateway_ is where the host routes traffic to other networks. Any traffic destined outside the local network will be sent to the default gateway for it to figure out where it needs to go.

- setting a static ip address

Network connection uses the DHCP (Dynamic Host Configuration Protocol) protocol to pull IP address from the network.

Edit the file `/etc/network/interfaces` to change the IP address

contents of the `/etc/network/interfaces` file

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback
```

```
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

# The loopback network interface
auto lo
iface lo inet loopback
auto eth0
iface eth0 inet static ❶
address 192.168.20.9
netmask 255.255.255.0 ❷
gateway 192.168.20.1 ❸
```

once the above file is edited, restart networking

- restart networking

```
root@kali:~# service networking restart
```

- viewing network connections

To view network connections, listening ports etc, `netstat` command may be used

```
root@kali:~# netstat -antp
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp6       0      0 :::80                   :::*                    LISTEN      15090/apache2
```


### Netcat

- view help of netcat

```
root@kali:~# nc -h
[v1.10-40]
connect to somewhere:   nc [-options] hostname port[s] [ports] ...
listen for inbound:     nc -l -p port [-options] [hostname] [port]
options:
      -c shell commands  as `-e'; use /bin/sh to exec [dangerous!!]
      -e filename       program to exec after connect [dangerous!!]
      -b                allow broadcasts
--snip--
```

- check if a port is listening

```
root@kali:~# nc -v 192.168.20.9 80
(UNKNOWN) [192.168.20.10] 80 (http) open
```

other option could be

```
root@kali:~# nc -vv 192.168.20.10 25
nc: 192.168.20.10 (192.168.20.10) 25 [smtp]❶ open
nc: using stream socket
nc: using buffer size 8192
nc: read 66 bytes from remote
220 bookxp SMTP Server SLmail 5.5.0.4433 Ready
ESMTP spoken here
nc: wrote 66 bytes to local
```

- listen on a port for an incoming connection

```
root@kali:~# nc -lvp 1234
listening on [any] 1234 ...
```

`l` - listen
`v` - verbose
`p` - port

open a second terminal and use netcat to connect to the netcat listener

```
root@kali:~# nc 192.192.168.20.9 1234
hi hazeez
```

Once the connection is established, the text appears on the listener

```
listening on [any] 1234 ...
connect to [192.168.20.9] from (UNKNOWN) [192.168.20.9] 51917
hi hazeez
```

use <kbd>Ctrl</kbd>+<kbd>C</kbd> to close netcat processes

- open a command shell listener using netcat

use the `-e` flag to tell netcat to execute /bin/bash when a connection is received

```
root@kali:~# nc -lvp 1234 -e /bin/bash
listening on [any] 1234 ...
```

Use a second terminal to connect to a netcat listener

```
root@kali:~# nc 192.192.168.20.9 1234
whoami
root
```

- output what comes to the listener to the screen

- send file contents across with netcat

_first terminal_

```
root@kali:~# nc -lvp 1234 > netcatfile
listening on [any] 1234 ...
```

_second terminal_

use the < symbol to send the contents of a file

```
root@kali:~# nc 192.168.20.9 1234 < mydirectory/myfile
```

### Automating tasks with Cron job

`cron` command allows to schedule tasks to automatically run at a specified time

`cron` related files are present in the `/etc` directory

```
root@kali:/etc# ls | grep cron
cron.d
cron.daily
cron.hourly
cron.monthly
crontab
cron.weekly
```

The _cron.daily_, _cron.hourly_, _cron.monthly_, and _cron.weekly_ directories specify scripts that will run automatically, every day, every hour, every month, or every week, depending on which directory you put your script in.

cron's configuration file is `/etc/crontab`

```
\# /etc/crontab: system-wide crontab
\# Unlike any other crontab you don't have to run the `crontab'
\# command to install the new version when you edit this file
\# and files in /etc/cron.d. These files also have username fields,
\# that none of the other crontabs do.

SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

\# m h dom mon dow user     command
17 *  * * * root    cd / && run-parts --report /etc/cron.hourly ❶
25 6  * * * root  test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily ) ❷
47 6  * * 7 root  test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6  1 * * root  test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
\#
```

