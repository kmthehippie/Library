const inputs = document.querySelectorAll(".input-field");
const newBook = document.querySelector(".new-book");
const library = document.querySelector(".library");
const esc = document.querySelector(".escape");
const mainBG = document.querySelector(".main-container");
const form = document.querySelector("form");
const bookRead = document.querySelector(".read");
const bookUnread = document.querySelector(".unread"); 

const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const bookPagesInput = document.querySelector("#book-pages");




//might want to add escape key down as the escape as well
esc.addEventListener("click", ()=>{
    library.style.display="grid";
    form.style.display="none";
    mainBG.style.backgroundColor = "rgba(22, 22, 22, 0.5)";
})

//JS for making the modal text look nice
inputs.forEach(inp =>{
    inp.addEventListener("focus", ()=>{
        inp.classList.add("active");
    })
    inp.addEventListener("blur", ()=>{
        if (inp.value != "") return;
        inp.classList.remove("active");
    })
})




// //when the submit button pressed
// //retrieve information from form
// //e.preventDefault()

let currentTitle;
let currentAuthor;
let currentPages;
let currentRead;

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    for (item of formData){

        //Assign title to title-key
        if(item[0] === "title"){
            currentTitle = item[1];
        } else if(item[0] === "author"){
            currentAuthor = item[1];
        } else if(item[0] === "pages"){
            currentPages = item[1];
        } else if(item[0] === "read-radio"){
            currentRead = item[1];
        }
    }

    //form reset + clear modal
    form.reset();
    library.style.display="grid";
    form.style.display="none";
    mainBG.style.backgroundColor = "rgba(22, 22, 22, 0.5)";
    

    //create a Book Object using currentTitle, currentAuthor, currentPages, currentRead
    let myTempBook = new Book(currentTitle, currentAuthor, currentPages, currentRead);
    myTempBook.info();

    //move this information into the library to be saved as an array piece

    //create new div with the class book, new div textcontent, new h3 class title, new h4 class author, new p with class pages (need to add em tag here too), then need to add the buttons div and the classes read unread remove inside it. LOL omg. how to do this??

    const bookCard = document.createElement("div");
    bookCard.classList = "book";
    //construct the contents of the book-card and add them to respective elements
    const textContentContainer = document.createElement("div");
    textContentContainer.classList = "text-content";
    //construct the content of the text-content elements
    const titleHead = document.createElement("h3");
    titleHead.classList = "title";
    titleHead.textContent = myTempBook.title;
    const authorHead = document.createElement("h4");
    authorHead.classList = "author";
    authorHead.textContent = myTempBook.author;
    const pagesPara = document.createElement("p");
    pagesPara.classList = "pages";
    pagesPara.textContent = myTempBook.pages + " pages";
    //add them to the text-content container
    textContentContainer.appendChild(titleHead);
    textContentContainer.appendChild(authorHead);
    textContentContainer.appendChild(pagesPara);
    console.log(textContentContainer);
    //add the textcontent to the book card.
    bookCard.appendChild(textContentContainer);

    //create div for buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList = "buttons";
    //choose read or unread to be displayed. created a active class to display or don't display
    const readOrUnread = document.createElement("div");
    if (currentRead === "read"){
        readOrUnread.classList = "read active";
        readOrUnread.textContent = "READ";
    } else if (currentRead === "unread" || currentRead === "undefined"){
        readOrUnread.classList = "unread active";
        readOrUnread.textContent = "UNREAD";
    }
    buttonsDiv.appendChild(readOrUnread);

    //remove div created for each card
    const removeDiv = document.createElement("div");
    removeDiv.classList = "remove";
    removeDiv.textContent = "REMOVE";
    buttonsDiv.appendChild(removeDiv);
    
    //add buttonsDiv to bookcard
    bookCard.appendChild(buttonsDiv);    

    //Add the card to the library (container)
    library.appendChild(bookCard);

    //Need to add Book to the LIBRARY  
    addBookToLibrary(myTempBook);
    console.log(library);
})




// //set information from form to the object
let myLibrary;
myLibrary = checkStorage();

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
    }
};

function addBookToLibrary(book){
    myLibrary.push(book);
    console.log(myLibrary);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    console.log(localStorage);
}

// //getItem from localstorage when starting page JSON.parse(myLibrary). if empty then run the Book function.
function checkStorage(){
    if (localStorage.getItem("myLibrary")){  
        populateStorage();
    } else {
        return [];
    }
}


// //setItem of object to localstorage under the name library
// //JSON.stringify(myLibrary)

function populateStorage(){
    localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"))

    for(item of myLibrary){
        console.log(item);
    }
}


//When buttons are clicked !! need to fix when no divs on page error appears for bookRead addEL bcoz bookRead dont exist
bookRead.addEventListener("click",()=>{
    bookRead.classList.remove = "active";
    bookUnread.classList.add = "active";
})

bookUnread.addEventListener("click",()=>{
    bookRead.classList.add = "active";
    bookUnread.classList.remove = "active";
})

newBook.addEventListener("click", ()=>{
    library.style.display="none";
    mainBG.style.backgroundColor = "rgba(22, 22, 22, 0.9)";
    form.style.display="block";
});

//remove function. clear out localStorage using localStorage.

function emptyStorage(){
    localStorage.clear();
}