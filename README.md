resizable
=========

Allows the resizing of elements with options

Prerequisites
=============

Jquery

Operating
=========

It's simple, put this in your code

$("ID/CLASS").resizable();


Options
=======

Default options:
snap_to_grid: false, //allows grid snapping
snap_to_width: 150, //the size of the grid width
snap_to_height: 75, //the size of the grid height
min_limit_x: 100, //the min width of your element
min_limit_y: 100, //the min height of your element
limit_to_container: true, // keeps it to the parent container
horizontal: true, // enables horizontal resizing
vertical: true, // enables vertical resizing
before: null, // before callback
complete: null // complete callback

Callbacks
=========
before: null, //happens before you move to resize
complete: null //happens after you finish
