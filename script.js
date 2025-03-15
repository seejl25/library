/* Library array to store books data */
const myLibrary = [];

// function Book (title, author, id, pages, status) {
//     this.title = title;
//     this.author = author;
//     this.id = id;
//     this.pages = pages;
//     this.status = status;
//     this.info = function() {
//         return `${this.title},by ${this.author},s/n: ${this.id},pages: ${this.pages},${this.status}`;
//     };
// };

class Book {
    constructor(title, author, id, pages, status) {
        this.title = title;
        this.author = author;
        this.id = id;
        this.pages = pages;
        this.status = status;
    }

    info() {
        return `${this.title},by ${this.author},s/n: ${this.id},pages: ${this.pages},${this.status}`;
    }
}

/* Functions */
function AddBookToLibrary () {
    const bookTitle = document.querySelector("#book-title").value;
    const bookAuthor = document.querySelector("#book-author").value;
    const bookId = self.crypto.randomUUID();
    const bookPages = document.querySelector("#book-pages").value;
    const bookStatus = document.querySelector("input[name=status]:checked").value;
    let newBook = new Book(bookTitle, bookAuthor, bookId, bookPages, bookStatus);
    myLibrary.push(newBook.info());
    displayBooks(myLibrary);

};

function displayBooks(libraryArr) {
    const container = document.querySelector(".container");
    const card = document.createElement("div");
    card.classList.add("bookcard");
    let bookInfo = libraryArr.at(-1);
    for (let i = 0; i < bookInfo.split(",").length; i++) {
        const text = document.createElement("p");
        text.textContent = bookInfo.split(",").at(i);
        card.appendChild(text);
    }
    container.appendChild(card);

    /* Toggling read and unread + remove */
    const allCard = document.querySelectorAll(".bookcard")
    const currStatus = document.querySelector("div p:last-child");
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle");
    toggleBtn.style.color = "white";
    toggleBtn.style.fontSize = "1rem";
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove");
    removeBtn.textContent = "remove";
    if (currStatus.textContent === "read") {
        currStatus.style.color = "green";
        toggleBtn.textContent = "unread";
        toggleBtn.style.backgroundColor = "red";
    }
    else {
        currStatus.style.color = "red";
        toggleBtn.textContent = "read";
        toggleBtn.style.backgroundColor = "green";
    }
    allCard.forEach(eachCard => {
        eachCard.appendChild(toggleBtn);
        eachCard.appendChild(removeBtn);
    })

    /* when toggle button is clicked */
    toggleBtn.addEventListener("click", () => {
        if (currStatus.textContent === "read") {
            currStatus.textContent = "unread";
            toggleBtn.textContent = "read";
            currStatus.style.color = "red";
            toggleBtn.style.backgroundColor = "green";
        }
        else {
            currStatus.textContent = "read";
            toggleBtn.textContent = "unread";
            currStatus.style.color = "green";
            toggleBtn.style.backgroundColor = "red";
        };
    });
    /* When remove button is clicked */
    removeBtn.addEventListener("click", () => {
        container.removeChild(card);
    })
};

function resetDialog() {
    allInputs = document.querySelectorAll("input");
    allInputs.forEach(eachInput => {
        if (eachInput.name === "book-title" || eachInput.name === "book-author" || eachInput.name === "book-pages") {
            eachInput.value = "";
        }
        else {
            eachInput.checked = false;
        }
    })
}


/* buttons for dialog form */
const addBook = document.querySelector("#add");
const submitBook = document.querySelector("#submit");
const cancel = document.querySelector("#cancel");
const dialog = document.querySelector("dialog");

addBook.addEventListener("click", () => {
    dialog.showModal();
});

cancel.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

submitBook.addEventListener("click", (e) => {
    AddBookToLibrary();
    e.preventDefault();
    dialog.close();
    resetDialog();
});

