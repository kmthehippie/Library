const inputs = document.querySelectorAll(".input-field");
const newBook = document.querySelector(".new-book");
const library = document.querySelector(".library");
const esc = document.querySelector(".escape");
const mainBG = document.querySelector(".main-container");
const form = document.querySelector("form");

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



//create new book

newBook.addEventListener("click", ()=>{
    library.style.display="none";
    mainBG.style.backgroundColor = "rgba(22, 22, 22, 0.9)";
    form.style.display="block";
});


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
    
    createTempBook(currentTitle, currentAuthor, currentPages, currentRead);
    //Need to add Book to the LIBRARY  
    addBookToLibrary(myTempBook);

        //create eventlistener for all read button unread button remove button. 
const readOrUnreadBtn = document.querySelectorAll(".read, .unread");
for(let i = 0; i < readOrUnreadBtn.length; i++){
    readOrUnreadBtn[i].addEventListener("click", ()=>{
        if(readOrUnreadBtn[i].textContent === "READ"){
            readOrUnreadBtn[i].classList.remove("read");
            //change the classlist to unread active and change text content to unread
            readOrUnreadBtn[i].classList.add("unread");
            readOrUnreadBtn[i].textContent = "UNREAD";
            //need to change current value keyed into local storage...but HOW? get key
            myLibrary[i].read = "unread";
            clearStorage();
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
        } else if (readOrUnreadBtn[i].textContent === "UNREAD" ){
            readOrUnreadBtn[i].classList.remove("unread");
            //change the classlist to unread active and change text content to unread
            readOrUnreadBtn[i].classList.add("read");
            readOrUnreadBtn[i].textContent = "READ";
            //need to change current value keyed into local storage...but HOW? get key
            myLibrary[i].read = "read";
            clearStorage();
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary));           
        }
    })
}

//clear storage
function clearStorage(){
localStorage.clear();
}

//create a listener for remove button and HOW TO TARGET THE SINGLE DIV TO BE REMOVED?????
const removeBtn = document.querySelectorAll(".remove");
    for(let i = 0; i < removeBtn.length; i++){    
        removeBtn[i].addEventListener("click", ()=>{       
            let frontPart = myLibrary.slice(0, [i]);
            let endPart = myLibrary.slice([i+1]);
            myLibrary = [...frontPart, ...endPart];
            clearStorage();
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); 
            location.reload();
        })
    }
   
})

let myTempBook;
function createTempBook(){
 //create a Book Object using currentTitle, currentAuthor, currentPages, currentRead
 myTempBook = new Book(currentTitle, currentAuthor, currentPages, currentRead);

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


}


// //set information from form to the object
let myLibrary;
myLibrary = checkStorage();

function Book (title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    // this.info = function(){
    //     console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`);
    // }
};



// //getItem from localstorage when starting page JSON.parse(myLibrary). if empty then run the Book function.
function checkStorage(){
    if (localStorage.getItem("myLibrary")){  
        populateStorage();
        return myLibrary;
    } else {
        return [];
    }
}


// //setItem of object to localstorage under the name library
// //JSON.stringify(myLibrary)

function populateStorage(){
    localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    for(item of myLibrary){
        currentTitle = item.title;
        currentAuthor = item.author;
        currentPages = item.pages;
        currentRead = item.read;  
        createTempBook(currentTitle, currentAuthor, currentPages, currentRead);    
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
//create eventlistener for all read button unread button remove button. 
const readOrUnreadBtn = document.querySelectorAll(".read, .unread");
    for(let i = 0; i < readOrUnreadBtn.length; i++){
        readOrUnreadBtn[i].addEventListener("click", ()=>{
            if(readOrUnreadBtn[i].textContent === "READ"){
                readOrUnreadBtn[i].classList.remove("read");
                //change the classlist to unread active and change text content to unread
                readOrUnreadBtn[i].classList.add("unread");
                readOrUnreadBtn[i].textContent = "UNREAD";
                //need to change current value keyed into local storage...but HOW? get key
                myLibrary[i].read = "unread";
                clearStorage();
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
            } else if (readOrUnreadBtn[i].textContent === "UNREAD" ){
                readOrUnreadBtn[i].classList.remove("unread");
                //change the classlist to unread active and change text content to unread
                readOrUnreadBtn[i].classList.add("read");
                readOrUnreadBtn[i].textContent = "READ";
                //need to change current value keyed into local storage...but HOW? get key
                myLibrary[i].read = "read";
                clearStorage();
                localStorage.setItem("myLibrary", JSON.stringify(myLibrary));           
            }
        })
    }

//clear storage
function clearStorage(){
    localStorage.clear();
}

//create a listener for remove button and HOW TO TARGET THE SINGLE DIV TO BE REMOVED?????
const removeBtn = document.querySelectorAll(".remove");
    for(let i = 0; i < removeBtn.length; i++){    
        removeBtn[i].addEventListener("click", ()=>{       
            let frontPart = myLibrary.slice(0, [i]);
            let endPart = myLibrary.slice([i+1]);
            myLibrary = [...frontPart, ...endPart];
            clearStorage();
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary)); 
            location.reload();
        })
    }

