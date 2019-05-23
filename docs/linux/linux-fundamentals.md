title: Linux Fundamentals

# Linux Fundamentals

## Linux Kernel

- Ensures coordination between hardware and software
- role includes managing hardware, processes, users, permissions and file systems
- provides a common base to all other programs on the systems

> Kernel space - space where the kernel runs a.k.a ring zero

<!--  -->

> User space - everything that happens outside of the kernel

### Linux Kernel Tasks

#### Driving Hardware

- controls the computer's hardware components
- makes the hardware available to higher-level software
- kernel exports data about detected hardware thru the `/proc` and `/sys` virtual file systems
- applications access devices by way of files created within the `/dev` folder

Specific files represent disk drives  

- partitions - `/dev/sda` `/dev/sda1`  
- mice - `/dev/input/mouse0`  
- keyboards - `/dev/input/event0`  
- sound cards - `/dev/snd/*`  
- serial ports - `/dev/ttyS*`  

There are two types of device files - _block_ and _character_

- _block_ has characteristics of a block of data
    - has finite size and bytes can be accesses anywhere in the block
- _character_ behaves like a flow of characters
    - can read and write characters but cannot seek a given position and change arbitrary bytes

To inspect the type of the given device file, inspect the first letter in the output `ls -l` 
It is either `b`, for block devices, or `c`, for character devices

``` hl_lines="1 2"
$ ls -l /dev/sda /dev/ttyS0
brw-rw---- 1 root disk 8, 0 Mar 21 08:44 /dev/sda
crw-rw---- 1 root dialout 4, 64 Mar 30 08:59 /dev/ttyS0
```

#### Unifying File Systems

- unix like systems merge all the file stores into a single hierarchy
- users and applications access data by knowing its location
- starting point of this hierarchy is called `root` (`\`)
- kernel translates this naming system and the storage location on the disk
- even if other disks are mounted, it will be in the single hierarchy

<hr>

- many file system formats supported - _ext2, ext3, ext4_
- other file systems also supported - _vfat_

<hr>

- to make a file system, run the command `mkfs.ext3`
- other file systems like _nfs_ (Network File System)
    - files are not stored locally but in the network on a server

#### Managing Processes

- a process is a **running instance** of a program
- requires memory to store program and the operating data

- when a program runs
    - kernel sets aside some memory
    - loads the executable code from the file system
    - starts the code running
    - the process is tracked by a _process identifier_ (PID)

<hr>

- kernel supports multi-taksing; multiple processes run at the same time
- kernel divides CPU time into small slices and runs each process in turn
- high-priority processes will run for longer periods and with more frequent time slices than low-priority processes

<hr>

- kernel allows several independent instances of the same program to run though only its own time slices and memory are allowed to access
    - the data remains independent

#### Rights Management

- unix like systems support multiple users and groups and allows control of permissions
- a process is identified by the user who started it
- the process is only permitted to take actions permitted for its owner
    - e.g. opening a file requires the kernel to check the process identity against access permissions

### The Command Line

- The default shell provided in Kali Linux is Bash ( Bourne Again SHell).
- The trailing `$` or `#` character indicates that the shell is awaiting your input. It also indicates whether Bash recognizes you as a _normal user_ (the former case with the dollar) or as a _super user_ (the latter case with the hash).

### The File System

#### The Filesystem Hierarchy Standard

- Kali linux follows the Filesystem Hierarchy Standard (FHS)
- defines the purpose of each directory
<hr>

- the top level directories are 

    - `/bin/` basic programs
    - `/boot/` Kali Linux kernel and other files required for its early boot process
    - `/dev/` device files
    - `/etc/` configuration files
    - `/home/` user’s personal files
    - `/lib/` basic libraries
    - `/media/*` mount points for removable devices (CD-ROM, USB keys, and so on)
    - `/mnt/` temporary mount point
    - `/opt/` extra applications provided by third parties
    - `/root/` administrator’s (root’s) personal files
    - `/sbin/` system programs
    - `/srv/` data used by servers hosted on this system
    - `/tmp/` temporary files (this directory is often emptied at boot)
    - `/var/` variable data handled by daemons. This includes log files, queues, spools, and caches.
    - `/proc/` and `/sys/` are specific to the Linux kernel (and not part of the FHS). They are used by the kernel for exporting data to user space.
    - `/run/` volatile runtime data that does not persist across reboots (not yet included in the FHS)
    - `/usr/` applications (this directory is further subdivided into `bin`, `sbin`, `lib` according to
    the same logic as in the root directory) Furthermore, `/usr/share/` contains architecture independent data. The `/usr/local/` directory is meant to be used by the administrator for
    installing applications manually without overwriting files handled by the packaging system
    (dpkg).


#### The User’s Home Directory









