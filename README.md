# discotheque

A browser extension that plays a song when your HTTP server is down.

[AVAILABLE ON CHROME] (https://chrome.google.com/webstore/detail/discotheque/dgdenkmmheancojbadfmfnmikekmbbik)

## What it does ##

* polls given URL and checks for HTTP status 200
* opens a window with given link (e.g. SoundCloud song) when server goes down
* closes the window when service starts responding again

## How to use it ##

1. click on the ![Disco Stu](icons/disco-stu-32.png) icon and select "Options"
2. fill in the URL you want to monitor
3. hit the "Save" button
4. Done!

You can optionally change the song URL and polling interval.

## Limitations ##

* it's a WIP
* only one configurable address
* probably works only in Chrome

## Credit ##
* it was all an idea of [xBajci] (https://github.com/xBajci) and [petrSchreiber] (https://github.com/petrSchreiber)
* icon made by [Jeanette Foshee] (https://sites.google.com/site/jeanettefoshee/)

## Disclaimer ##

Discotheque is not inteded to be a replacement for proper crash reporting.
