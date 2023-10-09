const myLibrary = [];
const bookshelf = document.querySelector(".bookshelf");

//Add new book dialog
const addBookButton = document.querySelector(".add-book-button");
const modalDialog = document.querySelector(".modal-box");
const closeDialogButton = document.querySelector(".close-dialog-button");
const submitBookButton = document.querySelector(".submit-book-button");


function Book(title, author, pageNum, isRead) {
    this.title = title;
    this.author = author;
    this.pageNum = pageNum;
    this.isRead = isRead;
    this.info = () => {
        let readStatus = (isRead) ? "already read" : "not read yet";
        return `${title} by ${author}, ${pageNum} pages, ${readStatus}`;
    };
}

/**
 * 
 * @param {Book} book 
 */
function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(){
    for(let i = 0; i < myLibrary.length; i++){
        let book =  document.createElement("div");
        book.classList.add("book");

        book.textContent = myLibrary[i].info();

        bookshelf.appendChild(book);
    }
}

addBookToLibrary(new Book("Test1", "Me", 16, false));
addBookToLibrary(new Book("Test2", "Me", 14, true));
addBookToLibrary(new Book("Test3", "Me", 23, false));

displayBooks();

addBookButton.addEventListener("click", (e) => {
    modalDialog.showModal();
});

closeDialogButton.addEventListener("click", (e) => {
    modalDialog.close();
});

submitBookButton.addEventListener("click", (e) => {
    let title = document.getElementById("book-title");
    let author = document.getElementById("book-author");
    let pageNum = document.getElementById("book-total-pages");
    let isRead = document.getElementById("book-read-status");
    console.log(`${title.value} ${author.value} ${pageNum.value} ${isRead.value}`);
    if(title.value != "" && author.value != "" && !isNaN(pageNum.value)){
        e.preventDefault();
    }
});