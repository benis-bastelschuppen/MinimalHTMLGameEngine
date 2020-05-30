# MinimalHTMLGameEngine
A minimal setup for a game engine: deltatime and doublebuffer

With that you have a nice javascript deltatime function and a
double buffered sprite rendered on only divs, not even using canvas or
other "advanced" stuff. Ok, it uses jQuery but I see that as a standard
and not some testout-and-forget stuff like some rendering engines or such.

Maybe you can learn how to make your own double buffer here and you can
definitely learn how deltatime gets used in a game. Have Fun.

What you will see is a walking animation of a CSS'ed-Sprite,
updated and rendered by JS on two divs inside the main div.

One of the divs is for drawing on and will be hidden while the
other one will be shown, with the last-before drawed frame image 
in it.

All will be rendered smoothly (except the lines from the borders,
which actually show you the two separate divs) so that no glipse is done
even if it may be to slow or "to fast".

Ah, and also, all JS file will be loaded with a loader mechanism so that
the html file only needs to include the JSloader and nothing else, not
even jQuery.

Have alot of Fun. :)
