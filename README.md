# forgetful-exit-alert

Using [simple_google_tts](https://github.com/Glutanimate/simple-google-tts) and a few wires,
receive a reminder to check your belongings when you open the front door.


Requirements
------------

- Some kind of Linux potato with some GPIO pins. You just need one addressable GPIO and a ground PIN. I am using a Pi Zero with physical PIN 36 (GPIO 16) so be sure to change the pin value, if you choose a different pin. If your potato isn't Debian-based, you're on your own :)
- An installation of the wiringpi libraries, headers and gpio command (usually already installed on Pis).
- TODO: finish requirements after I figure out the exact circuit.


Installing Node:
----------------
(Yes this is an old Node version because I am copying from an old README. Security does not matter on this thing).

Download archive:
    
    wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-armv7l.tar.gz

Extract it:
    
    tar -xf node-v12.18.3-linux-armv7l.tar.gz

Copy it:
    
    cp -r node-v12.18.3-linux-armv7l/* /usr/local/

Check it:
    
    node --version
    npm --version


Installing wiringpi
-------------------
If wiringpi is not installed:

    sudo apt install wiringpi -y


Installing the the node dependencies
------------------------------------
From the root of the repo:

    npm install

Setting up simple_google_tts
----------------------------
1) As per the instructions from [this link] (https://github.com/alexylem/jarvis/issues/129#issuecomment-248072872), download each of the following files on your Linux potato:
    - [libttspico-data] (http://ftp.fr.debian.org/debian/pool/non-free/s/svox/libttspico-data_1.0+git20130326-3_all.deb)
    - [libttspico0_1.0] (http://ftp.fr.debian.org/debian/pool/non-free/s/svox/libttspico0_1.0+git20130326-3_armhf.deb)
    - [libttspico-utils] (http://ftp.fr.debian.org/debian/pool/non-free/s/svox/libttspico-utils_1.0+git20130326-3_armhf.deb)

2) And following the same instructions, install each of the packages onto your Pi:

    sudo dpkg -i libttspico-data_1.0+git20130326-3_all.deb
    sudo dpkg -i libttspico0_1.0+git20130326-3_armhf.deb
    sudo dpkg -i libttspico-utils_1.0+git20130326-3_armhf.deb

3) If git is not installed, first, did you seriously download a ZIP file instead of clone this repo? Anyway, you will need to install it:

    sudo apt install git

4) As instructed in the [simple_google_tts readme](https://github.com/glutanimate/simple-google-tts), run the following command:

    sudo apt-get install xsel libnotify-bin libttspico0 libttspico-utils libttspico-data libwww-perl libwww-mechanize-perl libhtml-tree-perl sox libsox-fmt-mp3

5) Clone the repo into your home directory and then open ~/.bashrc:

    cd /home/pi; git clone https://github.com/Glutanimate/simple-google-tts.git
    nano .bashrc

| 6) On a new line, at the end of .bashrc, add the following:

.. code:: bash

    export PATH="$PATH:`pwd`/simple-google-tts"


Execute the code
-----------------

    node index.js
