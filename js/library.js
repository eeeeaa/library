class Book {
    constructor(title, author, pageNum, isRead) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.isRead = isRead;
    }

    info = () => {
        let readStatus = (this.isRead) ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pageNum} pages, ${readStatus}.`;
    }

    changeReadStatus = () => {
        this.isRead = !this.isRead;
    }
}

const library = (function (doc) {
    const myLibrary = [];
    const bookshelf = doc.querySelector(".bookshelf");

    function addBookToLibrary(book) {
        myLibrary.push(book);

        let displayBook = doc.createElement("div");
        displayBook.setAttribute("data-index", myLibrary.length - 1);
        displayBook.classList.add("book");
        displayBook.classList.add("cardAnimation");

        let bookTitle = doc.createElement("h2");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;

        let bookInfo = doc.createElement("div");
        bookInfo.classList.add("book-info");
        bookInfo.textContent = book.info();

        let removeButton = createRemoveButton(displayBook);

        let toggle = createReadStatusToggle(displayBook);

        displayBook.appendChild(bookTitle);
        displayBook.appendChild(bookInfo);
        displayBook.appendChild(removeButton);
        displayBook.appendChild(toggle);

        bookshelf.appendChild(displayBook);
    }

    function createRemoveButton(displayBook) {
        let button = doc.createElement("button");
        button.classList.add("remove-book-button");
        button.textContent = "Remove this book";
        button.addEventListener("click", (e) => {
            let targetBook = displayBook;
            let targetIndex = targetBook.getAttribute("data-index");
            myLibrary.splice(targetIndex, 1);
            bookshelf.removeChild(targetBook);

            let books = bookshelf.children;
            for (let i = 0; i < books.length; i++) {
                let child = books[i];
                child.setAttribute("data-index", i);
            }
            console.log(myLibrary);
        });

        return button;
    }

    function createReadStatusToggle(displayBook) {
        let container = doc.createElement("div");
        container.classList.add("toggle-container");

        let toggleLabel = doc.createElement("p");
        toggleLabel.textContent = "Read Status:";

        let toggle = doc.createElement("input");
        toggle.classList.add("toggle-read-status");
        toggle.setAttribute("type", "checkbox");
        toggle.setAttribute("name", "toggle-read-status");

        let parent = displayBook;
        let parentIndex = parent.getAttribute("data-index");
        toggle.checked = myLibrary[parentIndex].isRead;

        toggle.addEventListener("change", (e) => {
            myLibrary[parentIndex].changeReadStatus();
            updateBookInfo(displayBook, myLibrary[parentIndex].info());
        });

        container.appendChild(toggleLabel);
        container.appendChild(toggle);

        return container;
    }

    function updateBookInfo(displayBook, updatedText) {
        displayBook.querySelector(".book-info").textContent = updatedText;
    }

    return {
        addBookToLibrary
    }
})(document);

const libraryAction = (function (doc, lib) {
    const addBookButton = doc.querySelector(".add-book-button");
    const modalDialog = doc.querySelector(".modal-box");
    const closeDialogButton = doc.querySelector(".close-dialog-button");
    const submitBookButton = doc.querySelector(".submit-book-button");
    const randomBookButton = doc.querySelector(".random-book-button");

    function initializeListeners() {
        addBookButton.addEventListener("click", (e) => {
            modalDialog.showModal();
        });

        closeDialogButton.addEventListener("click", (e) => {
            modalDialog.close();
        });

        randomBookButton.addEventListener("click", (e) => {
            let randBook = new Book(
                (Math.random() + 1).toString(36).substring(5),
                (Math.random() + 1).toString(36).substring(5),
                Math.round((Math.random() + 1) * 10),
                (Math.random() < 0.5) ? true : false
            )
            lib.addBookToLibrary(randBook);
        });

        submitBookButton.addEventListener("click", (e) => {
            let title = doc.getElementById("book-title");
            let author = doc.getElementById("book-author");
            let pageNum = doc.getElementById("book-total-pages");
            let isRead = doc.getElementById("book-read-status");
            console.log(`${title.value} ${author.value} ${pageNum.value} ${isRead.value}`);
            if (title.value != "" && author.value != "" && !isNaN(pageNum.value)) {
                e.preventDefault();
                lib.addBookToLibrary(
                    new Book(
                        title.value,
                        author.value,
                        pageNum.value,
                        isRead.checked
                    )
                );
                modalDialog.close();
            }
        });
    }

    return {
        initializeListeners
    }

})(document, library);

libraryAction.initializeListeners();