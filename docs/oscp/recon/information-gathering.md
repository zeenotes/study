title: Information Gathering

**Goal of this phase is to learn about the targets as much as possible**

- Knowledge gained in this phase will be used to develop plans of attack
- will be used for searching and verifying vulnerabilities

## Open Source Intelligence Gathering (OSINT)

- information is gathered from legal sources like public records / social media

### Netcraft

- a compmay that logs the uptime and make queries about the underlying software

e.g query for bulbsecurity.com

![](https://learning.oreilly.com/library/view/penetration-testing/9781457185342/httpatomoreillycomsourcenostarchimages2030306.png.jpg)

using this information basic attacks can be drafted / developed

1. Rule out vulnerabilities that affect Microsoft IIS servers
2. Try out social engineering attack (phishing message from godaddy) to get credentials 

### WhoIs Lookups

- all domain registrars keep records of the domains they host
- contain certain information about the owner, including contact information

- to run WhoIs lookups, use the `whois` command

``` hl_lines="1 25 26"
root@kali:~# whois bulbsecurity.com
  Registered through: GoDaddy.com, LLC (http://www.godaddy.com)
   Domain Name: BULBSECURITY.COM
      Created on: 21-Dec-11
      Expires on: 21-Dec-12
      Last Updated on: 21-Dec-11

   Registrant: ❶
   Domains By Proxy, LLC
   DomainsByProxy.com
   14747 N Northsight Blvd Suite 111, PMB 309
   Scottsdale, Arizona 85260
   United States

   Technical Contact: ❷
      Private, Registration  BULBSECURITY.COM@domainsbyproxy.com
      Domains By Proxy, LLC
      DomainsByProxy.com
      14747 N Northsight Blvd Suite 111, PMB 309
      Scottsdale, Arizona 85260
      United States
      (480) 624-2599      Fax -- (480) 624-2598

   Domain servers in listed order:
      NS65.DOMAINCONTROL.COM ❸
      NS66.DOMAINCONTROL.COM
```

No 3 tells that the two DNS servers used. This site uses private registration else, a lot of details would have been shown


### DNS Reconnaissance

- Domain Name System (DNS) servers translate **the human-readable url www.example.com into an IP address**

#### Nslookup

- to get the ip address / vice-versa from an url, use the `nslookup` command

``` hl_lines="8"
root@Kali:~# nslookup www.bulbsecurity.com
Server:    75.75.75.75
Address:   75.75.75.75#53

Non-authoritative answer:
www.bulbsecurity.com    canonical name = bulbsecurity.com.
Name:    bulbsecurity.com
Address: 50.63.212.1 ❶
```

`nslookup` returned the IP address of the domain above.

- mail servers can be found by looking for MX records (DNS speak for email)

```
root@kali:~# nslookup
> set type=mx
> bulbsecurity.com
Server:    75.75.75.75
Address:   75.75.75.75#53

Non-authoritative answer:
bulbsecurity.com    mail exchanger = 40 ASPMX2.GOOGLEMAIL.com.
bulbsecurity.com    mail exchanger = 20 ALT1.ASPMX.L.GOOGLE.com.
bulbsecurity.com    mail exchanger = 50 ASPMX3.GOOGLEMAIL.com.
bulbsecurity.com    mail exchanger = 30 ALT2.ASPMX.L.GOOGLE.com.
bulbsecurity.com    mail exchanger = 10 ASPMX.L.GOOGLE.com.
```

Nslookup says _bulbsecurity.com_ is using Google Mail for its email servers


#### Host

Another utility for DNS queries is **Host**

> syntax: `host -t ns <domain>`

```
root@kali:~# host -t ns zoneedit.com
zoneedit.com name server ns4.zoneedit.com.
zoneedit.com name server ns3.zoneedit.com.
--snip--
```

The above output shows all the DNS servers for the website.

#### Zone Transfers

- DNS zone transfers allow name servers to replicate all the entries about a domain.
- many system administrators set up DNS zone transfers insecurely, so that anyone can transfer the DNS records for a domain
- use the `l` option to specify the domain to transfer

``` hl_lines="1 17"
root@kali:~# host -l zoneedit.com ns2.zoneedit.com
Using domain server:
Name: ns2.zoneedit.com
Address: 69.72.158.226#53
Aliases:

zoneedit.com name server ns4.zoneedit.com.
zoneedit.com name server ns3.zoneedit.com.
zoneedit.com name server ns15.zoneedit.com.
zoneedit.com name server ns8.zoneedit.com.
zoneedit.com name server ns2.zoneedit.com.
zoneedit.com has address 64.85.73.107
www1.zoneedit.com has address 64.85.73.41
dynamic.zoneedit.com has address 64.85.73.112
bounce.zoneedit.com has address 64.85.73.100
--snip--
mail2.zoneedit.com has address 67.15.232.182
--snip-
```

mail2.zoneedit.com is probably a mail server, so we should look for potentially vulnerable software running on typical email ports such as 25 (Simple Mail Transfer Protocol) and 110 (POP3). If we can find a webmail server, any usernames we find may lead us in the right direction so that we can guess passwords and gain access to sensitive company emails.

### Searching For Email Addresses

- One way to find usernames is by looking for email addresses on the Internet.
- a python tool called `theHarvester` can quickly scour thousands of search engine results for possible email addresses

- to look into the first 500 results in search engines for bulbsecurity.com use

``` hl_lines="1 26"
root@kali:~# theharvester -d bulbsecurity.com -l 500 -b all

*******************************************************************
*                                                                 *
* | |_| |__   ___    /\  /\__ _ _ ____   _____  ___| |_ ___ _ __  *
* | __| '_ \ / _ \  / /_/ / _` | '__\ \ / / _ \/ __| __/ _ \ '__| *
* | |_| | | |  __/ / __  / (_| | |   \ V /  __/\__ \ ||  __/ |    *
*  \__|_| |_|\___| \/ /_/ \__,_|_|    \_/ \___||___/\__\___|_|    *
*                                                                 *
* TheHarvester Ver. 2.2a                                          *
* Coded by Christian Martorella                                   *
* Edge-Security Research                                          *
* cmartorella@edge-security.com                                   *
*******************************************************************

Full harvest..
[-] Searching in Google..
    Searching 0 results...
    Searching 100 results...
    Searching 200 results...
    Searching 300 results...
--snip--

 [+] Emails found:
------------------
georgia@bulbsecurity.com

[+] Hosts found in search engines:
------------------------------------
50.63.212.1:www.bulbsecurity.com

--snip--
```

### Maltego

- a data-mining tool designed to visualize open source intelligence gathering

To run Maltego, run `maltego` at the command line. The Maltego GUI should launch.

```
root@kali:~# maltego
```

![](https://learning.oreilly.com/library/view/penetration-testing/9781457185342/httpatomoreillycomsourcenostarchimages2030308.png.jpg)

Now select the Palette option from the left-hand border. As you can see, we can gather information about all sorts of entities.

Let’s start with the bulbsecurity.com domain

Drag a Domain entity from the Palette onto the new graph. By default, the domain is paterva.com. To change it to bulbsecurity.com, either double-click the text or change the text field at the right side of the screen.

![](https://learning.oreilly.com/library/view/penetration-testing/9781457185342/httpatomoreillycomsourcenostarchimages2030310.png.jpg)

Once the domain is set, you can run transforms. Right-click the domain icon and choosing **Run Transform**

![](https://learning.oreilly.com/library/view/penetration-testing/9781457185342/httpatomoreillycomsourcenostarchimages2030312.png.jpg)

![](https://learning.oreilly.com/library/view/penetration-testing/9781457185342/httpatomoreillycomsourcenostarchimages2030314.png.jpg)

![](https://learning.oreilly.com/library/view/penetration-testing/9781457185342/httpatomoreillycomsourcenostarchimages2030316.png.jpg)

Maltego finds that www.bulbsecurity.com is an Apache web server with PHP, Flash, and so on, along with a WordPress install.

### Port Scanning

- finding which systems / services are active and which software to talk to

#### Manual Port Scanning

Exploiting the MS08-067 vulnerability can be an easy win for attackers and pentesters alike. To use this exploit, we need to **find a Windows 2000, XP, or 2003 box with an SMB server** that is missing the MS08-067 Microsoft patch available on the network. We can get a good idea about the network-based attack surface by mapping the network range and querying systems for listening ports.

Port scanning can be done manually by connecting to ports with a tool such as `telnet` or `netcat`

``` hl_lines="2 6"
root@kali:~# nc -vv 192.168.20.10 25
nc: 192.168.20.10 (192.168.20.10) 25 [smtp] open
nc: using stream socket
nc: using buffer size 8192
nc: read 66 bytes from remote
220 bookxp SMTP Server SLmail 5.5.0.4433 Ready
ESMTP spoken here
nc: wrote 66 bytes to local
```

The Windows XP box is running an SMTP server on port 25. After we connected, the SMTP server announced itself as SLMail -version 5.5.0.4433.

!!! Tip

        connecting to every possible TCP and UDP port on just one machine and noting the results can be time consuming. Port scanning tools such as `NMap` can be used to find listening ports

#### Automated Port Scanning - NMap

- NMap is the industry standard for port scanning

!!! Note

        If NMap scan does not return any result, it is likely that intrusion detection systems / firewall have blocked the scan traffic

##### A SYN Scan

A SYN scan is a TCP scan that does not finish the TCP handshake. A TCP connection starts with a three-way handshake: SYN ▸ SYN-ACK ▸ ACK

<div class="mermaid">
sequenceDiagram
    System1->>System2: SYN
    System2->>System1: SYN-ACK
    System1->>System2: ACK
</div>

In a SYN scan, Nmap sends the SYN and waits for the SYN-ACK if the port is open but never sends the ACK to complete the connection. If the SYN packet receives no SYN-ACK response, the port is not available; either it’s closed or the connection is being filtered.

> syntax: for a SYN scan is `-sS` flag

<!--  -->

> syntax: for outputing in all formats use `-oA` flag
>> this will output the reports in nmap, gnmap (greppable nmap) and in xml formats
>> the reports can be imported in tools to read and analyze

``` hl_lines="1"
root@kali:~# nmap -sS 192.168.20.10-12 -oA booknmap

Starting Nmap 6.40 ( http://nmap.org ) at 2015-12-18 07:28 EST
Nmap scan report for 192.168.20.10
Host is up (0.00056s latency).
Not shown: 991 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp ❷
25/tcp   open  smtp ❺
80/tcp   open  http ❸
106/tcp  open  pop3pw ❺
110/tcp  open  pop3 ❺
135/tcp  open  msrpc
139/tcp  open  netbios-ssn ❹
443/tcp  open  https ❸
445/tcp  open  microsoft-ds ❹
1025/tcp open  NFS-or-IIS
3306/tcp open  mysql ❻
5000/tcp open  upnp
MAC Address: 00:0C:29:A5:C1:24 (VMware)

Nmap scan report for 192.168.20.11
Host is up (0.00031s latency).
Not shown: 993 closed ports
PORT     STATE SERVICE
21/tcp   open  ftp ❷
22/tcp   open  ssh
80/tcp   open  http ❸
111/tcp  open  rpcbind
139/tcp  open  netbios-ssn ❹
445/tcp  open  microsoft-ds ❹
2049/tcp open  nfs
MAC Address: 00:0C:29:FD:0E:40 (VMware)

Nmap scan report for 192.168.20.12
Host is up (0.0014s latency).
Not shown: 999 filtered ports
PORT     STATE SERVICE
80/tcp   open  http ❶
135/tcp  open  msrpc
MAC Address: 00:0C:29:62:D5:C8 (VMware)

Nmap done: 3 IP addresses (3 hosts up) scanned in 1070.40 seconds
```

!!! Note on Ports

        |Port|Service|
        |---|---|
        |69|TFTP - UDP port|
        |80|HTTP Web Service|
        |139|Remote Procedure Call|

##### A Version Scan

- SYN scan does not tell which software is listening on the open ports

> syntax: for nmap full TCP scan `nmap -sT`

<!--  -->

> systax: for nmap version scan `nmap -sV` 
>> yeilds more data

```
root@kali:~# nmap -sV 192.168.20.10-12 -oA bookversionnmap
Starting Nmap 6.40 ( http://nmap.org ) at 2015-12-18 08:29 EST
Nmap scan report for 192.168.20.10
Host is up (0.00046s latency).
Not shown: 991 closed ports
PORT     STATE SERVICE      VERSION
21/tcp   open  ftp          FileZilla ftpd 0.9.32 beta
25/tcp   open  smtp         SLmail smtpd 5.5.0.4433
79/tcp   open  finger       SLMail fingerd
80/tcp   open  http         Apache httpd 2.2.12 ((Win32) DAV/2 mod_ssl/2.2.12 OpenSSL/0.9.8k
                              mod_autoindex_color PHP/5.3.0 mod_perl/2.0.4 Perl/v5.10.0)
106/tcp  open  pop3pw       SLMail pop3pw
110/tcp  open  pop3         BVRP Software SLMAIL pop3d
135/tcp  open  msrpc        Microsoft Windows RPC
139/tcp  open  netbios-ssn
443/tcp  open  ssl/http     Apache httpd 2.2.12 ((Win32) DAV/2 mod_ssl/2.2.12 OpenSSL/0.9.8k
                              mod_autoindex_color PHP/5.3.0 mod_perl/2.0.4 Perl/v5.10.0)
445/tcp  open  microsoft-ds Microsoft Windows XP microsoft-ds
1025/tcp open  msrpc        Microsoft Windows RPC
3306/tcp open  mysql        MySQL (unauthorized)
5000/tcp open  upnp         Microsoft Windows UPnP
MAC Address: 00:0C:29:A5:C1:24 (Vmware)
Service Info: Host: georgia.com; OS: Windows; CPE: cpe:/o:microsoft:windows

Nmap scan report for 192.168.20.11
Host is up (0.00065s latency).
Not shown: 993 closed ports
PORT     STATE SERVICE              VERSION
21/tcp   open  ftp                  vsftpd 2.3.4 ❶
22/tcp   open  ssh                  OpenSSH 5.1p1 Debian 3ubuntu1 (protocol 2.0)
80/tcp   open  http                 Apache httpd 2.2.9 ((Ubuntu) PHP/5.2.6-2ubuntu4.6 with
                                      Suhosin-Patch)
111/tcp  open  rpcbind (rpcbind V2) 2 (rpc #100000)
139/tcp  open  netbios-ssn          Samba smbd 3.X (workgroup: WORKGROUP)
445/tcp  open  netbios-ssn          Samba smbd 3.X (workgroup: WORKGROUP)
2049/tcp open  nfs (nfs V2-4)       2-4 (rpc #100003)
MAC Address: 00:0C:29:FD:0E:40 (VMware)
Service Info: OSs: Unix, Linux; CPE: cpe:/o:linux:kernel

Nmap scan report for 192.168.20.12
Host is up (0.0010s latency).
Not shown: 999 filtered ports
PORT     STATE SERVICE        VERSION
80/tcp   open  http           Microsoft IIS httpd 7.5
135/tcp  open  msrpc          Microsoft Windows RPC
MAC Address: 00:0C:29:62:D5:C8 (VMware)

Service detection performed. Please report any incorrect results at http://nmap.org/submit/ .
Nmap done: 3 IP addresses (3 hosts up) scanned in 20.56 seconds
```

!!! Note

        Keep in mind that Nmap may report the wrong version in some cases (for instance, if the software has been updated, but the welcome banner is not edited as part of the patch), but at the very least, its version scan gave us a good place to begin further research.


#### UDP Scans

Both Nmap’s SYN and version scans are TCP scans that do not query UDP ports

Scanning logic of UDP is different. Nmap sends a packet. If the port is open, the packet is received else, an ICMP Port Unreachable message is sent.

<div class="mermaid">
sequenceDiagram
    Nmap->>system1: sends a packet
    system1-->>Nmap: packet received - no error - port open
    system1->>Nmap: ICMP error - port closed
</div>


> syntax: `nmap -sU` flag is used for UDP scan

```
root@kali:~# nmap -sU 192.168.20.10-12 -oA bookudp

Starting Nmap 6.40 ( http://nmap.org ) at 2015-12-18 08:39 EST
Stats: 0:11:43 elapsed; 0 hosts completed (3 up), 3 undergoing UDP Scan
UDP Scan Timing: About 89.42% done; ETC: 08:52 (0:01:23 remaining)
Nmap scan report for 192.168.20.10
Host is up (0.00027s latency).
Not shown: 990 closed ports
PORT     STATE         SERVICE
69/udp   open|filtered tftp ❶
123/udp  open          ntp
135/udp  open          msrpc
137/udp  open          netbios-ns
138/udp  open|filtered netbios-dgm
445/udp  open|filtered microsoft-ds
500/udp  open|filtered isakmp
1026/udp open          win-rpc
1065/udp open|filtered syscomlan
1900/udp open|filtered upnp
MAC Address: 00:0C:29:A5:C1:24 (VMware)

Nmap scan report for 192.168.20.11
Host is up (0.00031s latency).
Not shown: 994 closed ports
PORT     STATE         SERVICE
68/udp   open|filtered dhcpc
111/udp  open          rpcbind
137/udp  open          netbios-ns
138/udp  open|filtered netbios-dgm
2049/udp open          nfs ❷
5353/udp open          zeroconf
MAC Address: 00:0C:29:FD:0E:40 (VMware)

Nmap scan report for 192.168.20.12
Host is up (0.072s latency).
Not shown: 999 open|filtered ports
PORT     STATE         SERVICE
137/udp  open          netbios-ns
MAC Address: 00:0C:29:62:D5:C8 (VMware)

Nmap done: 3 IP addresses (3 hosts up) scanned in 1073.86 seconds
```

#### Scanning A Specific Port

By default, **Nmap scans only the 1,000 ports** it considers the most “interesting,” not the 65,535 possible TCP or UDP ports.

> syntax: use the `-p` flag to scan specific ports

```hl_lines="1"
root@Kali:~# nmap -sS -p 3232 192.168.20.10

Starting Nmap 6.40 ( http://nmap.org ) at 2015-12-18 09:03 EST
Nmap scan report for 192.168.20.10
Host is up (0.00031s latency).
PORT     STATE SERVICE
3232/tcp open  unknown
MAC Address: 00:0C:29:A5:C1:24 (VMware)
```

- running a version scan against a specific port

==this may sometime crash the service but some information can be obtained==

In the process of crashing the listening service, Nmap can’t figure out what software is running as noted at ❶, but it does manage to get a fingerprint of the service. Based on the HTML tags in the fingerprint at ❷, this service appears to be a web server. According to the Server: field, it is something called Zervit 0.4 ❸.

```hl_lines="1 9"
root@kali:~# nmap -p 3232 -sV 192.168.20.10
Starting Nmap 6.40 ( http://nmap.org ) at 2015-04-28 10:19 EDT
Nmap scan report for 192.168.20.10
Host is up (0.00031s latency).
PORT     STATE SERVICE VERSION
3232/tcp open  unknown
1 service unrecognized despite returning data❶. If you know the service/version, please submit the following fingerprint at http://www.insecure.org/cgi-bin/servicefp-submit.cgi : ❷
SF-Port3232-TCP:V=6.25%I=7%D=4/28%Time=517D2FFC%P=i686-pc-linux-gnu%r(GetR
SF:equest,B8,"HTTP/1\.1\x20200\x20OK\r\nServer:\x20Zervit\x200\.4\r\n❸X-Pow
SF:ered-By:\x20Carbono\r\nConnection:\x20close\r\nAccept-Ranges:\x20bytes\
SF:r\nContent-Type:\x20text/html\r\nContent-Length:\x2036\r\n\r\n<html>\r\
SF:n<body>\r\nhi\r\n</body>\r\n</html>");
MAC Address: 00:0C:29:13:FA:E3 (VMware)
```

