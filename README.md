C3PO is a small app idea developed for the Comoyo Firefox OS Hack day, a satelite event for Web Rebels 2013.

C3PO simply takes your current location and gives you a list of 3 nearby places to go and check out.
Clicking the place brings up walking directions and you can get going.

Take note: **The code is a mess**.

## Running it

Either install the Firefox OS simulator, or just run `grunt connect` and open **localhost:9091** to test it in any browser.
The latest pushed version of Firefox OS that runs on Geekphones have some sort of broken geolocation API so it unfortunately crashes.
I expect this to suddenly be fixed though.

## TODO

This is what I wanted to do, that is not implemented

1. Make it look halfway ok
2. Use geolocation watching to _check off_ the place once you reach it
3. After checking off a place, a new place is made available
