# Library
Creating a Library (JS - project)

-> I forgot to create repo before starting the project. 
-> I started with writing out all the HTML and CSS.
-> Then started to write the JS on Day 3.

JS is the hardest I have done thus far.
I started with writing basic JS for effects or events that would occur when all the card divs were there.

Day 4 I start to add eventListener to the form.
This was incredibly tedious. I'm not sure if I would be able to extract the card-making as a function and then use the function as necessary in the entire doc.
I created object to auto create the Book Object and insert it to the localStorage.

myLibrary kept resetting everytime I refreshed because myLibrary = []; So it would be "new" everytime I refreshed the page.
I added a JSON.parse(localStorage.getItem("myLibrary)) This was the most important thing I learnt today. That it was NOT localStorage.getItem("myLibrary", JSON.parse(myLibrary)).

I am now having trouble trying to use the retrieved data from the localStorage. I need to use re-use the card-making part of the form listener. I need to figure this out.
<---------------------->

I fixed the local storage and the buttons eventually.
And also updated the footer's css.

ALL THINGS CAN BE CONQUERED IF YOU BREAK IT DOWN INTO SMALL ENOUGH A PIECE.